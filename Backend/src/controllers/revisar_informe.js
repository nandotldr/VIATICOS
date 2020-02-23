const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {
    consultarInformes: async(req, res) => {
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            //si usuario es A mostrar todas los informes en status 3
            if (existeUsuario[0].tipo_usuario == 'A') {
                const informe = await pool.query('SELECT i.id, i.id_solicitud_comision, i.status, u.codigo, u.area_adscripcion, i.fecha_elaboracion , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo=i.id_usuario INNER JOIN solicitud_comision AS c ON i.id_solicitud_comision = c.id WHERE i.status =3');
                if (informe.length < 1) return res.json({ ok: false, mensaje: "No hay informes por revisar" });

                return res.json({ ok: true, body: informe });

            } else if (existeUsuario[0].tipo_usuario == 'F') {
                const informe = await pool.query('SELECT i.id, i.status, u.codigo, u.area_adscripcion, i.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo=i.id_usuario INNER JOIN solicitud_comision AS c ON i.id_solicitud_comision = c.id WHERE i.status = 1');
                if (informe.length < 1) return res.json({ ok: false, mensaje: "No hay informes por aceptar" });

                return res.json({ ok: true, body: informe });
            }
            res.json({ ok: false, mensaje: "Funcion no disponible para tu usuario" })
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: 'Error inesperado' });

        }

    },

    aceptarInforme: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlInforme = 'SELECT i.id, i.status, u.codigo, i.fecha_elaboracion, concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo = i.id_usuario WHERE (i.status =1 OR i.status=3) AND i.id =?';
            const verificarInforme = await pool.query(sqlInforme, [req.body.id]);
            if (verificarInforme.length < 1) {
                return res.json({ ok: false, mensaje: "Error al aceptar informe" });
            }
            console.log(verificarInforme);
            const usuario = await pool.query("SELECT CONCAT(u.nombres, ' ' , u.apellidos) as nombre FROM viaticos.usuario as u WHERE codigo = ?", [req.user.codigo]);
            var sqlInforme = 'UPDATE informe_actividades SET ? WHERE id = ?';
            //si usuario =F modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (req.user.tipo_usuario == 'F' && verificarInforme[0].status == 1) {

                pool.query(sqlInforme, [{
                    fecha_revisado: new Date(),
                    nombre_revisado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status
                }, req.body.id], (errorModificar, modificarInforme) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarInforme.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto el informe" });

                });
                return res.json({ ok: true, mensaje: "Informe modificado exitosamente" });
            } else if (req.user.tipo_usuario == 'A' && verificarInforme[0].status == 3) {
                pool.query(sqlInforme, [{
                    fecha_aprobacion: new Date(),
                    nombre_aprobacion: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status
                }, req.body.id], (errorModificar, modificarInforme) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarInforme.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto el informe" });
                });
                return res.json({ ok: true, mensaje: "Informe modificado exitosamente" });
            }
            res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },
}