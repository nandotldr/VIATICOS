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
        pool.query('SELECT * FROM factura WHERE id_informe_actividades = ?', [req.body.id_informe_actividades], (errorfactura, factura) => {
            if (errorfactura) return res.json({ ok: false, mensaje: 'No existe esta factura' });
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
                if (errorModificar) return res.json({ ok: false, mensaje: 'Error al modificar la factura' });

                res.json({ ok: true, modificarfactura, mensaje: "factura modificada" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    },

    // subirFactura: async(req, res) => {
    //     try {
    //         // Existe archivo
    //         if (!req.file) {
    //             return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
    //         }
    //         // Existe la comision
    //         const existeInforme = await pool.query('SELECT * FROM informe_actividades WHERE id = ?', [req.body.id] pool.query('SELECT archivo_url FROM factura where id_informe_actividades = ?', existeInforme[0].id, (errorFactura, factura) =>
    //             if (errorFactura) return res.json(errorFactura)));
    //         if (existeInforme.length === 0) {
    //             return res.json({ ok: false, mensaje: 'No existe el informe.' });
    //         }
    //         // Cual es el archivo 
    //         let currentFile = informe[0].invitacion_evento;
    //         // Mover archivo nuevo
    //         let newFileName = `${uniqid()}.${req.file.originalname.split('.')[1]}`;
    //         if (!fs.existsSync(`public/files/${req.body.id}`)) {
    //             fs.mkdirSync(`public/files/${req.body.id}`);
    //         }
    //         fs.renameSync(req.file.path, `public/files/${req.body.id}/${newFileName}`);
    //         // Actuvalizar bd
    //         await pool.query('UPDATE solicitud_comision SET invitacion_evento=? WHERE id=?', [newFileName, req.body.id]);
    //         // Borrar archivo antiguo si existe
    //         res.json({ ok: true, mensaje: 'Archivo agregado.' })
    //     } catch (error) {
    //         res.json({ ok: false, error, mensaje: 'Ocurrio un error inesperado.' });
    //     }
    // }
}