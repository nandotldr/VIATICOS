const pool = require('../database');

/*
* La información se puede sacar de 
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    insert: (req, res) => {
        //req.decoded.codigo
        //req.decoded.tipo_usuario
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'facturas insert'});
        });
    },

    selectAll: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'facturas selectAll'});
        });
    },

    select: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'facturas select'});
        });
    },

    update: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'facturas update'});
        });
    },

    delete: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'facturas delete'});
        });
    },

    // Cosas extra como subir archivos etc
}