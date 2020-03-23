const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearAgenda: async(req, res) => {
        try {
            await pool.query('INSERT INTO agenda SET ?', [{
                dia: req.body.dia,
                hora_inicio: req.body.hora_inicio,
                hora_fin: req.body.hora_fin,
                actividad: req.body.actividad,
                id_informe_actividades: req.body.id_informe_actividades
            }]);
            res.json({ ok: true, mensaje: 'Agenda Creada' });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },

    selectAgenda: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM agenda WHERE id_informe_actividades = ?', [id], (erroragenda, agenda) => {
            console.log(erroragenda);
            if (erroragenda) return res.json({ ok: false, mensaje: erroragenda });
            if (agenda.length < 1) return res.json({ ok: false, mensaje: "No existe agenda" });

            res.json({ ok: true, body: agenda });
        });


    },

    modificarAgenda: async(req, res) => {
        try {
            const existeagenda = await pool.query('SELECT id FROM agenda WHERE id=?', [req.body.id]);
            if (existeagenda.length < 1) {
                return res.json({ ok: false, mensaje: "Esta agenda no existe" });
            }
            pool.query('UPDATE agenda SET ? WHERE id = ?', [{
                dia: req.body.dia,
                hora_inicio: req.body.hora_inicio,
                hora_fin: req.body.hora_fin,
                actividad: req.body.actividad
            }, req.body.id], (errorModificar, modificaragenda) => {
                console.log(errorModificar);
                if (errorModificar) return res.json({ ok: false, mensaje: "Error al intentar modificar tu agenda" });

                res.json({ ok: true, modificaragenda, mensaje: "Agenda modificada" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },

    eliminarAgenda: async(req, res) => {
        const numAgenda = await pool.query("SELECT id FROM agenda WHERE id_informe_actividades= ? ", [req.body.id_informe_actividades]);
        if (numAgenda.length == 1) return res.json({ ok: false, mensaje: "No puedes eliminar la última actividad de la agenda" });

        pool.query('DELETE FROM agenda WHERE id = ?', [req.body.id], (error, results) => {
            if (error) return res.json({ ok: false, mensaje: error });
            res.json({ ok: true, results, mensaje: 'Actividad eliminada de Agenda' });
        });
    }
}