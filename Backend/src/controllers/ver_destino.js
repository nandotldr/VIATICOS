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
                pool.query('SELECT p.nombre as pais, c.nombre as continente , p.zona, p.id as id_pais FROM pais as p INNER JOIN continente as c on c.id= p.id_continente group by p.id', (errordestino, destino) => {
                    if (errordestino) return res.json({ ok: false, mensaje: errordestino });
                    if (destino.length < 1) return res.json({ ok: false, mensaje: "Error" });

                    res.json({ ok: true, body: destino });
                });
            } else if (tipo_comision == 1) {
                pool.query('SELECT m.nombre as municipio, e.nombre as estado , m.zona, m.id as id_municipio FROM viaticos.municipio as m INNER JOIN estado as e on e.id= m.id_estado group by m.id', (errordestino, destino) => {
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