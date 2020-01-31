const pool = require('../database');

/*
* La información se puede sacar de 
* req.body, req.get, req.params
* respectivamente.
*/
    
module.exports = {

    insert: async(req, res) => {
        var id_viatico = req.body.id_solicitud_viatico;
        var dias = req.body.dia;
        var aliment = req.body.alimentacion;
        var hos = req.body.hospedaje;
        var transporteLocal = req.body.transportelocal;
        var transporteForaneo = req.body.transporteforaneo;
        var combustible_viaje = req.body.combustible;
        var otros = req.body.otros;

        var buscarSolicitudV = 'SELECT id FROM solicitud_viatico WHERE id = ?';
        var insertarGasto = 'INSERT INTO gasto SET ?';
        console.log(id_viatico);
        try 
        {
            const existe = await pool.query(buscarSolicitudV, [id_viatico]);
            if(existe.length == 0)
                return res.json({ok: false, mensaje: 'no existe el viatico'});
            var valuesSolicitud = {
                dia : dias,
                alimentacion : aliment,
                hospedaje : hos,
                transporte_local : transporteLocal,
                transporte_foraneo : transporteForaneo,
                combustible : combustible_viaje,
                otros_conceptos : otros,
                id_solicitud_viatico : id_viatico
            };
            pool.query(insertarGasto, [valuesSolicitud], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'gasto insertado', mensaje: 'ok'});
            });
        } catch(e) {
            return res.json({ ok: false, mensaje: e });
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
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'conceptoGasto select'});
        });
    },

    update: async(req, res) => {
        var idGasto = req.body.idGasto;
        var idSolViatico = req.body.idViatico;
        var dias = req.body.dia;
        var aliment = req.body.alimentacion;
        var hos = req.body.hospedaje;
        var transporteLocal = req.body.transportelocal;
        var transporteForaneo = req.body.transporteforaneo;
        var combustible_viaje = req.body.combustible;
        var otros = req.body.otros;
        
        var buscarSolicitudG = 'SELECT id FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)';
        var actualizarSolicitudG = 'UPDATE gasto SET ? WHERE id_solicitud_viatico = ? AND id = ?';

        try 
        {
            const existe = await pool.query(buscarSolicitudG, [idSolViatico]);
            if(existe.length == 0)
                return res.json({ ok: false, mensaje: 'El gasto no puede ser modificado actualmente' });
            var valuesGasto = {
                dia : dias,
                alimentacion : aliment,
                hospedaje : hos,
                transporte_local : transporteLocal,
                transporte_foraneo : transporteForaneo,
                combustible : combustible_viaje,
                otros_conceptos : otros,
            };
            pool.query(actualizarSolicitudG, [valuesGasto, idGasto], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'Gasto actualizado', mensaje: 'ok'});
            });
        } catch(e) {
            return res.json({ ok: false, mensaje: e });
        }
    },

    delete: async(req, res) => {
        const { id } = req.params;
        const { idV } = req.params;
        console.log(id);
        console.log(idV);
        const cuantos = await pool.query('SELECT * FROM gasto WHERE id_solicitud_viatico = ?', [idV]);
        if(cuantos.length <= 1)
            return res.json({ok: false, mensaje: 'El viatico no puede quedar sin gastos o no tiene gastos actualmente'});
        const verificar = await pool.query('SELECT * FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)', [ididV]);
        if(verificar.length == 0)
            return res.json({ok: false, mensaje: 'El gasto no puede ser eliminado actualmente'});
        pool.query('DELETE FROM gasto WHERE id = ?', [id], (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'Gasto borrado', mensaje: 'Gasto eliminado'});
        });
    },

    // Cosas extra como subir archivos etc
}