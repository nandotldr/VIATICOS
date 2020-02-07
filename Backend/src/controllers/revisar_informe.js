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
                const informe = await pool.query('SELECT i.id, i.status, u.codigo, u.area_adscripcion, i.fecha_elaboracion , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo=i.id_usuario INNER JOIN solicitud_comision AS c ON i.id_solicitud_comision = c.id WHERE i.status =3');
                if (comision.length < 1) res.json({ ok: false, mensaje: "No hay informes por revisar" });

                return res.json({ ok: true, body: informe });

            } else if (existeUsuario[0].tipo_usuario == 'F') {
                const informe = await pool.query('SELECT i.id, i.status, u.codigo, u.area_adscripcion, i.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM informe_actividades AS c INNER JOIN usuario as u ON u.codigo=i.id_usuario INNER JOIN solicitud_comision AS c ON i.id_solicitud_comision = c.id WHERE i.status = 1 group by i.id');
                if (comision.length < 1) res.json({ ok: false, mensaje: "No hay informes por aceptar" });

                return res.json({ ok: true, body: comision });
            }
            res.json({ ok: false, mensaje: "Funcion no disponible para tu usuario" })
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }

    },

    modificarInforme: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlInforme = 'SELECT i.id, i.status, u.codigo, i.fecha_solicitud , concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo = i.id_usuario WHERE i.id = ? AND (i.status =1 OR i.status=3)';
            const verificarInforme = await pool.query(sqlInforme, [req.body.id]);
            if (verificarInforme.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede modificar comision" });
            }
            var modificarInforme = 'UPDATE informe_actividades SET ? WHERE id = ?';
            //si usuario =F modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (verificarInforme[0].tipo_usuario == 'F' && verificarInforme[0].status == 1) {
                pool.query(modificarinforme, [{
                    fecha_revisado: new Date(),
                    nombre_revisado: verificarInforme[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                }, req.body.id], (errorModificar, modificarInforme) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });

                });
                return res.json({ ok: true, mensaje: "Informe modificado" });

            } else if (verificarInforme[0].tipo_usuario == 'A' && verificarInforme[0].status == 3) {
                pool.query(modificarInforme, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado: new Date(),
                    nombre_aceptado: verificarInforme[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                }, req.body.id], (errorModificar, modificarInforme) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                });
                return res.json({ ok: true, mensaje: "Informe modificado" });

            }

            res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },
}