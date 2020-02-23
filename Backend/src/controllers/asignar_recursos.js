const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    update: async(req, res) => {
        const id = req.body.id;
        var asignarRecursos = 'UPDATE viatico_proyecto SET status = 2 WHERE id = ?';

        try {
            pool.query(asignarRecursos, [id], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, controller: 'Recursos asignados ', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error al asignar los recursos' });
        }
    }

    // Cosas extra como subir archivos etc
}