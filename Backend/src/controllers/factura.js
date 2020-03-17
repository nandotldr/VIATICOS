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
            return res.json({ ok: false, mensaje: 'Error al crear la factura' });
        }
    },

    selectfactura: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM factura WHERE id_informe_actividades = ?', [id], (errorfactura, factura) => {
            if (errorfactura) return res.json({ ok: false, mensaje: 'No existe esta factura' });
            if (factura.length < 1) return res.json({ ok: false, mensaje: "No existen facturas registradas en este informe" });

            res.json({ ok: true, body: factura });
        });


    },
    modificarfactura: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const informe = await pool.query('SELECT * FROM informe_actividades WHERE id = ?', [req.body.id]);
            const factura = await pool.query('SELECT archivo_url FROM factura WHERE id_informe_actividades = ?', informe[0].id);
            if (informe.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe el informe.' });
            }
            // Cual es el archivo 
            let currentFile = factura[0].id;
            // Mover archivo nuevo
            let newFileName = `${uniqid()}.${req.file.originalname.split('.')[1]}`;
            if (!fs.existsSync(`public/facturas/${req.body.id}`)) {
                fs.mkdirSync(`public/facturas/${req.body.id}`);
            }
            fs.renameSync(req.file.path, `public/facturas/${req.body.id}/${newFileName}`);
            // Actualizar bd
            await pool.query('UPDATE factura SET archivo_url=? WHERE id=?', [newFileName, req.body.id]);
            // Borrar archivo antiguo si existe
            if (fs.existsSync(`public/facturas/${req.body.id}/${currentFile}`)) {
                fs.unlinkSync(`public/facturas/${req.body.id}/${currentFile}`);
            }
            res.json({ ok: true, mensaje: 'Archivo modificado.' })
        } catch (error) {
            res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
        }
    },

    subirFactura: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const informe = await pool.query('SELECT * FROM informe_actividades WHERE id = ?', [req.body.id]);
            if (informe.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe el informe.' });
            }
            // Mover archivo nuevo
            let newFileName = `${uniqid()}.${req.file.originalname.split('.')[1]}`;
            if (!fs.existsSync(`public/facturas/${req.body.id}`)) {
                fs.mkdirSync(`public/facturas/${req.body.id}`);
            }
            fs.renameSync(req.file.path, `public/facturas/${req.body.id}/${newFileName}`);
            // Actuvalizar bd
            await pool.query('INSERT factura SET id_informe_actividades=? WHERE id=?', [newFileName, req.body.id]);
            res.json({ ok: true, mensaje: 'Archivo agregado.' })
        } catch (error) {
            res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
        }
    },
}