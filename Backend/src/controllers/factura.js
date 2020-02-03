const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearfactura: async(req, res) => {
        try {
            await pool.query('INSERT INTO factura SET ?', [{
                archivo_url: req.body.archivo_url,
                id_informe_actividades: req.body.id_informe_actividades
            }]);
            res.json({ ok: true, mensaje: 'factura creada' });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },

    selectfactura: (req, res) => {
        pool.query('SELECT * FROM factura WHERE id_informe_actividades = ?', [req.body.id_informe_actividades], (errorfactura, factura) => {
            console.log(errorfactura);
            if (errorfactura) return res.json({ ok: false, mensaje: errorfactura });
            if (factura.length < 1) return res.json({ ok: false, mensaje: "No existen facturas registradas en este informe" });

            res.json({ ok: true, body: factura });
        });


    },
    modificarfactura: async(req, res) => {
        try {
            const existefactura = await pool.query('SELECT id FROM factura WHERE id=?', [req.body.id]);
            if (existefactura.length < 1) {
                return res.json({ ok: false, mensaje: "Este factura no existe" });
            }
            pool.query('UPDATE factura SET ? WHERE id = ?', [{
                archivo_url: req.body.archivo_url
            }, req.body.id], (errorModificar, modificarfactura) => {
                if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });

                res.json({ ok: true, modificarfactura, mensaje: "factura modificada" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    }
}