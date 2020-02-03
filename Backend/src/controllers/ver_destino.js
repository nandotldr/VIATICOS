const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    selectdestino: async(req, res) => {
        try {
            var tipo_comision = req.body.tipo_comision;
            if (tipo_comision == 0) {
                pool.query('SELECT * FROM pais', (errordestino, destino) => {
                    if (errordestino) return res.json({ ok: false, mensaje: errordestino });
                    if (destino.length < 1) return res.json({ ok: false, mensaje: "Error" });

                    res.json({ ok: true, body: destino });
                });
            } else if (tipo_comision == 1) {
                pool.query('SELECT * FROM municipio', (errordestino, destino) => {
                    if (errordestino) return res.json({ ok: false, mensaje: errordestino });
                    if (destino.length < 1) return res.json({ ok: false, mensaje: "Error" });

                    res.json({ ok: true, body: destino });
                });
            }
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }

    },
}