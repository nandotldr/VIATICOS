const pool = require('../database');

/*
* La información se puede sacar de 
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    insert: async(req, res) => {
        var id_comision = req.body.id;
        var id_usuario = req.decoded.codigo;
        var invitado_n = req.body.invitado;
        var comentarios = req.body.comentarios;
        var status = req.body.estado;
        var buscarSolicitudC = 'SELECT * FROM solicitud_comision WHERE id = ?';
        var insertarSolicitud = 'INSERT INTO solicitud_viatico SET ?';

        try 
        {
            const existe = await pool.query(buscarSolicitudC, [id_comision]);
            console.log(invitado_n);
            if(existe.length == 0)
                return res.json({ok: false, mensaje: 'no existe la comision'});
            var valuesSolicitud = {
                invitado_nombre : invitado_n,
                id_solicitud_comision : id_comision,
                comentarios : comentarios,
                status : status,
                fecha_solicitud : new Date(),
                comentario_rechazo : '',
                fecha_revisado : new Date(),
                nombre_revisado : '',
                fecha_aceptado : new Date(),
                nombre_aceptado : '',
                fecha_creacion : new Date(),
                fecha_modificacion : new Date(),
                id_usuario : id_usuario
            };
            pool.query(insertarSolicitud, [valuesSolicitud], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico insertado', mensaje: 'ok'});
            });
        } catch(e) {
            return res.json({ ok: false, mensaje: e });
        }

        
    },


    select: (req, res) => {
        const { id } = req.params;
        var verSolicitud = 'SELECT * FROM solicitud_viatico INNER JOIN gasto ON solicitud_viatico.id = gasto.id_solicitud_viatico WHERE id = ? AND estado == 1';
        pool.query(verSolicitud, [id], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico buscado'});
        });
    },

    update: async(req, res) => {
        var idSolViatico = req.body.id_solicitudV;
        var status = req.body.estado;
        var id_usuario = req.decoded.codigo;
        var buscarSolicitudV = 'SELECT id FROM solicitud_viatico INNER JOIN gasto ON solicitud_viatico.id = gasto.id_solicitud_viatico WHERE id = ?';
        var actualizarSolicitudV = 'UPDATE solicitud_viatico SET ? WHERE id_solicitud = ?';

        try 
        {
            const existe = await pool.query(buscarSolicitudV, [idSolViatico]);
            if(existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la solicitud' });
            var valuesSolicitud = {
                estado : status,
                fecha_solicitud : new Date(),
                fecha_modificacion : new Date()
            };
            pool.query(actualizarSolicitudV, [valuesSolicitud, idSolViatico], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico actualizado', mensaje: 'ok'});
            });
        } catch(e) {
            return res.json({ ok: false, mensaje: e });
        }
    }

    // Cosas extra como subir archivos etc
}