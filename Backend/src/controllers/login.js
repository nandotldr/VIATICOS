const pool = require('../database');
// const objectJWT = require('../../config/config');
const jwt = require('../services/jwt');

module.exports = {

    selectLogin: async(req, res) => {
        return res.json({ ok: true, token: jwt.createToken('11111111', 'P')});


        console.log(req.body);
        var username = req.body.codigo;
        var password = req.body.nip;
        //Se selecciona el solo el ID y el tipo de usuario para saber a que vista mandarlo
        const usuario = await pool.query('SELECT codigo, tipo_usuario, nombres FROM usuario WHERE codigo = ? AND nip = ?', [
            username, password
        ]);
        console.log(usuario);
        if (usuario.length == 0) {
            return res.json({ ok: false, mensaje: 'Usuario o Contraseña incorrectos' });
        }
        pool.query('SELECT codigo, nombres, tipo_usuario  FROM usuario where codigo = ?', [usuario[0].codigo], (errorUsuario, user) => {
            if (errorUsuario) return res.json(errorUsuario);

            return res.json({ ok: true, token: jwt.createToken(user[0].codigo, user[0].tipo_usuario)});
            // res.json({ usuario: objectJWT.generador(user) });
        });

    }
}