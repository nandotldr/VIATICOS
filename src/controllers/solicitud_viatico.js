const pool = require('../database');

/*
* La información se puede sacar de 
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    insert: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico insert'});
        });
    },

    selectAll: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico selectAll'});
        });
    },

    select: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico select'});
        });
    },

    update: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico update'});
        });
    },

    delete: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'solicitudViatico delete'});
        });
    },

    // Cosas extra como subir archivos etc
}