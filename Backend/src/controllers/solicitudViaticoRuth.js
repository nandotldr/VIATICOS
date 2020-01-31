const pool = require('../database');

/*
* La información se puede sacar de 
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    select: (req, res) => {
        const { id } = req.params;
        var verSolicitud = 'SELECT * FROM solicitud_viatico AS sv INNER JOIN gasto AS g ON sv.id = g.id_solicitud_viatico WHERE sv.id = ? AND sv.status = 1 ';
        pool.query(verSolicitud, id, (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico buscado'});
        });
    },

    update: async(req, res) => {
        var idSolViatico = req.body.id_solicitudV;
        var status = req.body.estado;
        var comentarios = req.body.comentariosRechazo;

        var buscarSolicitudV = 'SELECT * FROM solicitud_viatico AS sv INNER JOIN gasto AS g ON sv.id = g.id_solicitud_viatico WHERE sv.id = ?';
        var actualizarSolicitudV = 'UPDATE solicitud_viatico SET ? WHERE id_solicitud = ?';

        try 
        {
            const existe = await pool.query(buscarSolicitudV, [idSolViatico]);
            if(existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la solicitud' });
            if(status == 4)
            {
       		var valuesSolicitud = {
               	estado : status,
                fecha_revisado : new Date(),
                //nombre_revisado : nombre,
                comentarios_rechazo : comentarios,
              	fecha_modificacion : new Date()
           	    };
            }
            else
            {
                var valuesSolicitud = {
                estado : status,
                fecha_aceptado : new Date(),
                //nombre_aceptado : nombre,
                fecha_modificacion : new Date()
                };
            }
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