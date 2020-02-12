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
            var id_destino = req.body.id;
            if (tipo_comision == 0) {
                pool.query('SELECT id, nombre FROM pais WHERE id_continente = ?', id_destino, (errordestino, destino) => {
                    if (errordestino) return res.json({ ok: false, mensaje: errordestino });
                    if (destino.length < 1) return res.json({ ok: false, mensaje: "Error" });

                    res.json({ ok: true, body: destino });
                });
            } else if (tipo_comision == 1) {
                pool.query('SELECT id, nombre FROM municipio WHERE id_estado = ?', id_destino, (errordestino, destino) => {
                    if (errordestino) return res.json({ ok: false, mensaje: errordestino });
                    if (destino.length < 1) return res.json({ ok: false, mensaje: "Error" });

                    res.json({ ok: true, body: destino });
                });
            }
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error al encontrar el destino' });
        }

    },
}