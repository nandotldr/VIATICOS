const pool = require('../database');
var uniqid = require('uniqid');
const fs = require("fs");
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
    downloadfactura: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM factura WHERE id = ?', [id], (errorfactura, factura) => {
            if (errorfactura) return res.json({ ok: false, mensaje: 'No existe esta factura' });
            if (factura.length < 1) return res.json({ ok: false, mensaje: "No existe esta factura" });
            console.log(factura[0].archivo_url);
            res.download(factura[0].archivo_url);
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
            let newFileName = `uploads/factura-${req.body.id}.${req.file.originalname.split('.')[1]}`;
            if (fs.existsSync(`uploads`)) {
                fs.renameSync(`uploads/${req.file.filename}`, newFileName, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }
            //Actualizar bd
            await pool.query('INSERT INTO factura (archivo_url,id_informe_actividades) VALUES (? , ?)', [newFileName, req.body.id]);
            return res.json({ ok: true, mensaje: 'Archivo agregado.' })
            } catch (error) {
                res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
            }
            

    },
    deletefactura: async(req, res) => {
        try {
            const { id } = req.params;
            // Existe la comision
            const factura = await pool.query('SELECT archivo_url FROM factura WHERE id = ?', [id]);
            if (factura.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe la factura.' });
            }
            
            // Cual es el archivo 
            let currentFile = factura[0].archivo_url;
            // Actualizar bd
            await pool.query('DELETE FROM factura WHERE id = ?', [id]);
            // Borrar archivo
            console.log(factura);
            if (fs.existsSync(`${currentFile}`)) {
                fs.unlinkSync(`${currentFile}`);
            }
            res.json({ ok: true, mensaje: 'Archivo eliminado.' })
        } catch (error) {
            res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
        }
    },
}