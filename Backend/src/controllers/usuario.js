const pool = require('../database');
const bcrypt = require('bcryptjs');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearUsuario: async(req, res) => {
        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.body.codigo]);
            if (existeUsuario.length > 0) {
                return res.json({ ok: false, mensaje: "Este usuario ya existe" });
            }
            await pool.query('INSERT INTO usuario SET ?', [{
                codigo: req.body.codigo,
                nombres: req.body.nombres.toUpperCase(),
                apellidos: req.body.apellidos.toUpperCase(),
                tipo_usuario: req.body.tipo_usuario,
                nip: bcrypt.hashSync(req.body.nip, 9),
                area_adscripcion: req.body.area_adscripcion.toUpperCase(),
                plaza_laboral: req.body.plaza_laboral.toUpperCase(),
                fecha_creacion: new Date(),
                numero_social: req.body.numero_social
            }]);
            res.json({ ok: true, mensaje: 'Cuenta creada' });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },

    selectUsuario: (req, res) => {
        pool.query('SELECT * FROM usuario WHERE codigo = ?', [req.user.codigo], (errorUsuario, usuario) => {
            if (errorUsuario) return res.json({ ok: false, mensaje: errorUsuario });
            if (usuario.length < 1) return res.json({ ok: false, mensaje: "No existe usuario" });
            let json = {
                codigo: usuario[0].codigo,
                nombres: usuario[0].nombres,
                apellidos: usuario[0].apellidos,
                area_adscripcion: usuario[0].area_adscripcion,
                plaza_laboral: usuario[0].plaza_laboral,
                numero_social: usuario[0].numero_social
            };

            res.json({ ok: true, body: json });
        });


    },
    //D
    modificarUsuario: async(req, res) => {
        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.body.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            pool.query('UPDATE usuario SET ? WHERE codigo = ?', [{
                nombres: req.body.nombres.toUpperCase(),
                apellidos: req.body.apellidos.toUpperCase(),
                area_adscripcion: req.body.area_adscripcion.toUpperCase(),
                plaza_laboral: req.body.plaza_laboral.toUpperCase(),
                numero_social: req.body.numero_social,
                fecha_modificacion: new Date()
            }, req.body.codigo], (errorModificar, modificarUsuario) => {
                console.log(errorModificar);
                if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });

                res.json({ ok: true, mensaje: "Cuenta modificada" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }


    }
}