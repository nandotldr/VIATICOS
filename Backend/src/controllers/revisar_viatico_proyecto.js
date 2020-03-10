const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {
    consultarViaticoProyecto: async(req, res) => {
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            //si usuario es F mostrar todas las peticiones de proyectos en status 1
            if (existeUsuario[0].tipo_usuario == 'F') {
                const proyecto = await pool.query('SELECT p.id, p.fecha_solicitud, p.numero_proyecto, u.area_adscripcion, p.cantidad , p.id_solicitud_viatico, p.status, concat(u.nombres," ",u.apellidos) as nombre  FROM viatico_proyecto AS p INNER JOIN solicitud_viatico AS v ON p.id_solicitud_viatico = v.id INNER JOIN usuario as u ON u.codigo = v.id_usuario WHERE p.status =1 OR p.status =1;');
                if (proyecto.length < 1) return res.json({ ok: false, mensaje: "No hay solicitudes de proyecto por revisar" });


                return res.json({ ok: true, body: proyecto });
            }else if (existeUsuario[0].tipo_usuario == 'A'){
                const proyecto = await pool.query('SELECT p.id, p.fecha_solicitud, p.numero_proyecto, u.area_adscripcion, p.cantidad , p.id_solicitud_viatico, p.status, concat(u.nombres," ",u.apellidos) as nombre  FROM viatico_proyecto AS p INNER JOIN solicitud_viatico AS v ON p.id_solicitud_viatico = v.id INNER JOIN usuario as u ON u.codigo = v.id_usuario WHERE p.status =1 OR p.status =3;');
                if (proyecto.length < 1) return res.json({ ok: false, mensaje: "No hay solicitudes de proyecto por revisar" });


                return res.json({ ok: true, body: proyecto });
            }
            res.json({ ok: false, mensaje: "Funcion no disponible para tu usuario" })
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: 'No se pudieron recuperar las solicitudes de viatico' });

        }

    },

    aceptarViaticoProyecto: async(req, res) => {
        try {
            var sqlViatico_proyecto = 'SELECT p.id, p.id_solicitud_viatico, p.status, u.codigo, p.fecha_solicitud, concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM viatico_proyecto AS p INNER JOIN solicitud_viatico as v ON p.id_solicitud_viatico = v.id INNER JOIN usuario as u ON u.codigo = v.id_usuario WHERE p.id = ?';
            const verificarViatico_proyecto = await pool.query(sqlViatico_proyecto, [req.body.id]);
            if (verificarViatico_proyecto.length < 1) {
                return res.json({ ok: false, mensaje: "Error al aceptar la solicitud del proyecto" });
            }
            const usuario = await pool.query("SELECT CONCAT(u.nombres, ' ' , u.apellidos) as nombre FROM viaticos.usuario as u WHERE codigo = ?", [req.user.codigo]);
            var sqlViatico_proyecto = 'UPDATE viatico_proyecto SET ? WHERE id = ?';
            //si usuario = F modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (req.user.tipo_usuario == 'F' && verificarViatico_proyecto[0].status == 1) {
                pool.query(sqlViatico_proyecto, [{
                    fecha_aceptado: new Date(),
                    nombre_aceptado: usuario[0].nombre,
                    status: req.body.status
                }, req.body.id], (errorModificar, modificarViatico_proyecto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: 'Error al modificar' });
                    if (modificarViatico_proyecto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la solicitud" });
                });
                return res.json({ ok: true, mensaje: "Solicitud del viatico modificada exitosamente" });
            }else if (req.user.tipo_usuario == 'A' && verificarViatico_proyecto[0].status == 3){
                pool.query(sqlViatico_proyecto, [{
                    fecha_aceptado: new Date(),
                    nombre_aceptado: usuario[0].nombre,
                    status: req.body.status
                }, req.body.id], (errorModificar, modificarViatico_proyecto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: 'Error al modificar' });
                    if (modificarViatico_proyecto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la solicitud" });
                }); 
                pool.query('UPDATE solicitud_viatico SET ? WHERE id = ?',[{status: 6},verificarViatico_proyecto[0].id_solicitud_viatico]);
                return res.json({ ok: true, mensaje: "Solicitud del viatico modificada exitosamente" });
            }
            return res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false,error, mensaje: "Error inesperado" });
        }
    },
}