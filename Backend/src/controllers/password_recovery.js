const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    update: async(req, res) => {
        var codigo = req.body.codigo;
        var nombres = req.body.nombres;
        var apellidos = req.body.apellidos;
        var numero_social = req.body.numero_social;
        var nueva_contraseña = req.body.nueva_contraseña;

        var buscarUsuario = 'SELECT codigo FROM usuario WHERE codigo = ? AND numero_social = ?';
        var actualizarContraseña = 'UPDATE usuario SET ? WHERE codigo = ?';

        try {
            const existe = await pool.query(buscarUsuario, [codigo, numero_social]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'Datos Incorrectos' });

            pool.query(actualizarContraseña, [nueva_contraseña, codigo], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'Contraseña actualizada ', mensaje: 'ok' });
            });
        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
    }

    // Cosas extra como subir archivos etc
}