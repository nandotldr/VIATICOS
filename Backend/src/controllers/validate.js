const pool = require('../database');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

    validate: async(req, res) => {

        try {
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "El token expiro" });
            }
            res.json({ ok: true, mensaje: "Token Valido", body: existeUsuario });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });

        }
    },
}