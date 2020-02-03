const pool = require('../database');
// const objectJWT = require('../../config/config');
const jwt = require('../services/jwt');
const bcrypt = require('bcryptjs');

module.exports = {

    selectLogin: async(req, res) => {
        try {
            // seleccionar todos los usuarios con el codigo ?
            const usuarios = await pool.query('SELECT codigo, nip, tipo_usuario FROM usuario WHERE codigo=?', [req.body.codigo]);
            // Si no hay no existe el usuario regresar error
            if (usuarios.length < 1) {
                return res.json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
            }
            // Comparar contraseña de bd con el hash(contraseña en el body)
            // Si da error no coincide la contraseña
            if (!bcrypt.compareSync(req.body.nip, usuarios[0].nip)) { // bcrypt.compareSync(req.body.nip, ususarios[0].nip)
                return res.json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
            }
            // regresar token con jwt.createToken('11111111', 'P')}
            return res.json({ ok: true, token: jwt.createToken(usuarios[0].codigo, usuarios[0].tipo_usuario) });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado.', error });
        }
    }
}