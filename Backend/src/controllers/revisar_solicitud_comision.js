const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {
    solicitudesComisionesPorRevisar: async(req, res) => {
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            //si usuario es A mostrar todas las solocitudes de comison en status 3
            if (existeUsuario[0].tipo_usuario == 'A') {
                const comision = await pool.query('SELECT c.id, c.status, u.codigo, u.area_adscripcion,c.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo=c.id_usuario WHERE c.status =3');
                if (comision.length < 1) return res.json({ ok: false, mensaje: "No hay comisiones por aceptar" });

                return res.json({ ok: true, body: comision });

            } else if (existeUsuario[0].tipo_usuario == 'J') {
                const comision = await pool.query('SELECT c.id, c.status, u.codigo, u.area_adscripcion,c.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo=c.id_usuario WHERE c.status =1 AND u.area_adscripcion = ? group by c.id,u.codigo', [existeUsuario[0].area_adscripcion]);
                if (comision.length < 1) return res.json({ ok: false, mensaje: "No hay comisiones por aceptar" });

                return res.json({ ok: true, body: comision });
            }
            res.json({ ok: false, mensaje: "Funcion no disponible para tu usuario" })
                //si usuario es J NO FUNCIONA JEJE mostrar las solicitudes de su dependencia 
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }

    },

    aceptarComision: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlSolComision = 'SELECT c.id, c.status, u.codigo, c.fecha_solicitud , concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo = c.id_usuario WHERE c.id = ? AND (c.status=1 or c.status=3)';
            const verificarComision = await pool.query(sqlSolComision, [req.body.id_comision]);
            if (verificarComision.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede aceptar la comision" });
            }
            const usuario = await pool.query("SELECT CONCAT(u.nombres, ' ' , u.apellidos) as nombre FROM viaticos.usuario as u WHERE codigo = ?", [req.user.codigo]);
            console.log(verificarComision);
            var modificarComision = 'UPDATE solicitud_comision SET ? WHERE id = ?';
            //si usuario =J modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (req.user.tipo_usuario == 'J' && verificarComision[0].status == 1) {
                pool.query(modificarComision, [{
                    fecha_modificacion: new Date(),
                    fecha_revisado: new Date(),
                    nombre_revisado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                }, req.body.id_comision], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarComision.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });


                });
                return res.json({ ok: true, mensaje: "Comision aceptada" });

            } else if (req.user.tipo_usuario == 'A' && verificarComision[0].status == 3) {
                console.log("usuario A");
                pool.query(modificarComision, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado: new Date(),
                    nombre_aceptado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                }, req.body.id_comision], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarComision.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });

                });
                return res.json({ ok: true, mensaje: "Comision aceptada" });

            }
            res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },
}