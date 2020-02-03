const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

    terminar_comision: async(req, res) => {

        try {
            const existeComision = await pool.query('SELECT id FROM solicitud_comision WHERE id= ?', [req.body.id]);
            if (existeComision.length < 1) {
                return res.json({ ok: false, mensaje: "Esta comision no existe" });
            }
            pool.query('UPDATE solicitud_comision SET status = 6 WHERE id = ?', [req.body.id], (errorTerminar, terminarcomision) => {
                if (errorTerminar) return res.json({ ok: false, mensaje: errorTerminar });

                res.json({ ok: true, terminarcomision, mensaje: "Comision terminada satisfactoriamente" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    }
}