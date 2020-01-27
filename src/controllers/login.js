const pool = require('../database');
const objectJWT = require('../../config/config');

module.exports = {

    selectLogin: async(req, res) => {

        var username = req.body.codigo;
        var password = req.body.nip;

        // Existe trabajador
        //Se selecciona el solo el ID y el tipo de usuario para saber a que vista mandarlo
        const usuario = await pool.query('SELECT id_trabajador, tipo_user FROM usuario WHERE username = ? AND password = ?', [
            username, password
        ]);
        if (usuario.length == 0) {
            return res.json({ ok: false, mensaje: 'Usuario o Contraseña incorrectos' });
        }
        pool.query('SELECT CONCAT (nombre1," ", apellido_p) AS nombre, codigo_trabajador AS codigo, area_adscripcion AS areaAdcripcion  FROM trabajador where id_trabajador = ?', [usuario[0].id_trabajador], (errorTrabajador, trabajador) => {
            if (errorTrabajador) return res.json(errorTrabajador);

            res.json({ trabajador: objectJWT.generador(usuario, trabajador) });
        });

    }
}