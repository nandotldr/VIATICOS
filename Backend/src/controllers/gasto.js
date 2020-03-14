const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    insert: async(req, res) => {
        
        
        try{
        var id_viatico = req.body.id_solicitud_viatico;
        var dias = req.body.dia;
        var rubro = req.body.rubro;
        var cantidad = req.body.cantidad;
        var proyecto = req.body.proyecto;
        var estatus = req.body.estatus;

        var buscarSolicitudV = 'SELECT id FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)';
        var insertarGasto = 'INSERT INTO gasto SET ?';
        
            cantidad = (cantidad < 1) ? 0:cantidad;

            const existe = await pool.query(buscarSolicitudV, [id_viatico]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe el viatico o no se puede crear con el estatus actual' });
            var valuesSolicitud = {
                dia: dias,
                rubro: rubro,
                cantidad: cantidad,
                proyecto: proyecto,
                estatus: estatus,
                id_solicitud_viatico: id_viatico
            };
            pool.query(insertarGasto, [valuesSolicitud], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'Gasto insertado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }


    },

    /*selectAll: (req, res) => {
            pool.query('SELECT * FROM gasto', (error, results) => {
                if(error) return res.json(error);
                    res.json({ ok: true, results, controller: 'conceptoGasto selectAll'});
            });
        
    },*/

    select: (req, res) => {
        const { id } = req.params;
        var consultaGasto = 'SELECT * FROM gasto WHERE id_solicitud_viatico = ?';
        pool.query(consultaGasto, [id], (error, results) => {
            if (error) return res.json(error, 'Error al consultar el gasto');
            res.json({ ok: true, results, controller: 'conceptoGasto select' });
        });
    },

    update: async(req, res) => {
        var idGasto = req.body.idGasto;
        var idSolViatico = req.body.idViatico;
        var dias = req.body.dia;
        var rubro = req.body.rubro;
        var cantidad = req.body.cantidad;
        var proyecto = req.body.proyecto;
        var estatus = req.body.estatus;

        var buscarSolicitudG = 'SELECT id FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)';
        var actualizarSolicitudG = 'UPDATE gasto SET ? AND id = ?';

        try {
            const existe = await pool.query(buscarSolicitudG, [idSolViatico]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'El gasto no puede ser modificado actualmente' });
            var valuesGasto = {
                dia: dias,
                rubro: rubro,
                cantidad: cantidad,
                proyecto: proyecto,
                estatus: estatus,
            };
            pool.query(actualizarSolicitudG, [valuesGasto, idGasto], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'Gasto actualizado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    },

    delete: async(req, res) => {
        const cuantos = await pool.query('SELECT * FROM gasto WHERE id_solicitud_viatico = ?', [req.body.idV]);
        if (cuantos.length <= 1)
            return res.json({ ok: false, mensaje: 'El viatico no puede quedar sin gastos o no tiene gastos actualmente' });
        const verificar = await pool.query('SELECT * FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)', [req.body.idV]);
        if (verificar.length == 0)
            return res.json({ ok: false, mensaje: 'El gasto no puede ser eliminado actualmente' });
        pool.query('DELETE FROM gasto WHERE id = ?', [req.body.id], (error, results) => {
            if (error) return res.json(error);
            res.json({ ok: true, results, controller: 'Gasto borrado', mensaje: 'Gasto eliminado' });
        });
    },

    // Cosas extra como subir archivos etc
}