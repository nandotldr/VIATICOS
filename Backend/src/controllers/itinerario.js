const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearitinerario: async(req, res) => {
        try {
            await pool.query('INSERT INTO itinerario SET ?', [{
                dia: req.body.dia,
                origen: req.body.origen,
                destino: req.body.destino,
                id_informe_actividades: req.body.id_informe_actividades,
            }]);
            res.json({ ok: true, mensaje: 'Itinerario creado' });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },

    selectitinerario: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM itinerario WHERE id_informe_actividades = ?', [id], (erroritinerario, itinerario) => {
            console.log(erroritinerario);
            if (erroritinerario) return res.json({ ok: false, mensaje: erroritinerario });
            if (itinerario.length < 1) return res.json({ ok: false, mensaje: "No existe itinerario" });

            res.json({ ok: true, body: itinerario });
        });


    },
    //D
    modificaritinerario: async(req, res) => {
        try {
            const existeitinerario = await pool.query('SELECT id FROM itinerario WHERE id=?', [req.body.id]);
            if (existeitinerario.length < 1) {
                return res.json({ ok: false, mensaje: "Este itinerario no existe" });
            }
            pool.query('UPDATE itinerario SET ? WHERE id = ?', [{
                dia: req.body.dia,
                origen: req.body.origen,
                destino: req.body.destino,
            }, req.body.id_itinerario], (errorModificar, modificaritinerario) => {
                console.log(errorModificar);
                if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });

                res.json({ ok: true, modificaritinerario, mensaje: "Itinerario modificado" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },
    eliminaritinerario: (req, res) => {
        pool.query('DELETE FROM itinerario WHERE id = ?', [req.body.id], (error, results) => {
            if (error) return res.json({ ok: false, mensaje: error });
            res.json({ ok: true, results, mensaje: 'Itinerario eliminado' });
        });
    }
}