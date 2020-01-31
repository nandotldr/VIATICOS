const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    insert: async(req, res) => {
        var id_comision = req.body.id;
        var id_usuario = req.user.codigo;
        var invitado_n = req.body.invitado;
        var comentarios = req.body.comentarios;
        var status = req.body.estado;
        var buscarSolicitudC = 'SELECT * FROM solicitud_comision WHERE id = ?';
        var insertarSolicitud = 'INSERT INTO solicitud_viatico SET ?';

        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            const existeSolicitud = await pool.query('SELECT * FROM solicitud_comision WHERE id = ? AND status=5', [id_comision]);
            if (existeSolicitud.length < 1) {
                return res.json({ ok: false, mensaje: "Comision no ha sido aprovada" });
            }
            const existe = await pool.query(buscarSolicitudC, [id_comision]);
            console.log(invitado_n);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la comision' });
            var valuesSolicitud = {
                invitado_nombre: invitado_n,
                id_solicitud_comision: id_comision,
                comentarios: comentarios,
                status: status,
                fecha_solicitud: new Date(),
                comentario_rechazo: '',
                fecha_revisado: new Date(),
                nombre_revisado: '',
                fecha_aceptado: new Date(),
                nombre_aceptado: '',
                fecha_creacion: new Date(),
                fecha_modificacion: new Date(),
                id_usuario: id_usuario
            };

            pool.query(insertarSolicitud, [valuesSolicitud], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'solicitudViatico insertado', mensaje: 'ok', ultimaid: results.insertId });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }


    },


    select: (req, res) => {
        const { id } = req.params;
        var verSolicitud = 'SELECT * FROM solicitud_viatico as sv INNER JOIN gasto as g ON sv.id = g.id_solicitud_viatico WHERE sv.id = ? AND status = 1';
        pool.query(verSolicitud, [id], (error, results) => {
            if (error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico buscado' });
        });
    },

    update: async(req, res) => {
        var idSolViatico = req.body.id_solicitudV;
        var status = req.body.estado;
        var comentarios = req.body.comentario;
        var id_usuario = req.user.codigo;
        var buscarSolicitudV = 'SELECT * FROM solicitud_viatico as sv INNER JOIN gasto as g ON sv.id = g.id_solicitud_viatico WHERE sv.id = ?';
        var actualizarSolicitudV = 'UPDATE solicitud_viatico SET ? WHERE id_solicitud_comision = ?';

        try {
            const existe = await pool.query(buscarSolicitudV, [idSolViatico]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la solicitud' });
            var valuesSolicitud = {
                status: status,
                fecha_solicitud: new Date(),
                fecha_modificacion: new Date(),
                comentarios: comentarios
            };
            pool.query(actualizarSolicitudV, [valuesSolicitud, idSolViatico], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'solicitudViatico actualizado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error al realizar la query" });
        }
    }

    // Cosas extra como subir archivos etc
}