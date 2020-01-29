const pool = require('../database');
const bcrypt = require('bcryptjs');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearUsuario: async (req, res) => {
        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo= ?', [req.body.codigo]);
            if (existeUsuario.length > 0) {
                return res.json({ ok: false, mensaje: "Este usuario ya existe" });
            }
            await pool.query('INSERT INTO usuario SET ?', [
                {
                    codigo: req.body.codigo,
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    tipo_usuario: req.body.tipo_usuario,
                    nip: bcrypt.hashSync(req.body.nip, 9),
                    area_adscripcion: req.body.area_adscripcion,
                    plaza_laboral: req.body.plaza_laboral,
                    fecha_creacion: new Date(),
                    numero_social: req.body.numero_social
                }
            ]);
            console.log("Cuenta Creada");
            res.json({ ok: true, mensaje: 'Cuenta creada' });
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },

    selectUsuario: (req, res) => {
        const { codigo } = req.params;
        console.log(codigo);
        pool.query('SELECT * FROM usuario WHERE codigo = ?', [codigo], (errorUsuario, usuario) => {
            console.log(errorUsuario);
            if (errorUsuario) return res.json(errorUsuario);
            if (usuario.length < 1) return res.json(usuario);
            let json = {
                codigo: usuario[0].codigo,
                nombres: usuario[0].nombres,
                apellidos: usuario[0].apellidos,
                area_adscripcion: usuario[0].area_adscripcion,
                plaza_laboral: usuario[0].plaza_laboral,
                numero_social: usuario[0].numero_social
            };

            res.json(json);
        });


    },
    //D
    modificarUsuario: async (req, res) => {
        try {
            var codigo = req.body.codigo;
            var nombres = req.body.nombres;
            var apellidos = req.body.apellidos;
            var areaAdscripcion = req.body.area_adscripcion;
            var plazaLaboral = req.body.plaza_laboral;
            var numeroSocial = req.body.numero_social;
            var valuesUsuario = {
                nombres: nombres,
                apellidos: apellidos,
                area_adscripcion: areaAdscripcion,
                plaza_laboral: plazaLaboral,
                numero_social: numeroSocial,
                fecha_modificacion: new Date()
            };
            console.log(valuesUsuario);
            var sqlModificarUsuario = "UPDATE usuario SET nombres = ?, apellidos =?, area_adscripcion =?, plaza_laboral =?, numero_social = ?, fecha_modificacion = ?' WHERE codigo = ?";
            pool.query(sqlModificarUsuario, [valuesUsuario], [codigo], (errorModificar, modificarUsuario) => {
                if (errorModificar) return res.json(errorModificar);

            });
        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
        res.json({ ok: true, mensaje: "Cuenta modificada" });

    }
}