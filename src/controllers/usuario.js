const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearUsuario: async(req, res) => {
        var codigoUsuario =req.body.codigo;
        var nombresUsuario = req.body.nombres;
        var apellidosUsuario = req.body.apellidos;
        var tipo_usuario = req.body.tipo_usuario;
        var password = req.body.nip;
        var areaAdscripcion = req.body.area_adscripcion;
        var plazaLaboral = req.body.plaza_laboral;
        var numeroSocial = req.body.numero_social;

        var sqlExisteUsuario= "SELECT codigo FROM usuario WHERE codigo= ?";
        var sqlUsuario = "INSERT INTO usuario SET ?";
        try {
            const existeUsuario = await pool.query(sqlExisteUsuario, [codigoUsuario]);
            console.log(existeUsuario.length);
            if (existeUsuario.length > 0) {
                return res.json({ ok: false, mensaje: "Este usuario ya existe" });
            }
            var valuesUsuario = {
                codigo: codigoUsuario,
                nombres: nombresUsuario,
                apellidos: apellidosUsuario,
                tipo_usuario: tipo_usuario,
                nip: password,
                area_adscripcion: areaAdscripcion,
                plaza_laboral: plazaLaboral,
                fecha_creacion: new Date(),
                numero_social: numeroSocial
            };
            pool.query(sqlUsuario, [valuesUsuario], (error, results) => {
                if (error) return res.json(error);
            });
            console.log("Cuenta Creada");
        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
        res.json({ ok: true, mensaje: 'Cuenta creada' });
    },

    selectUsuario: (req, res) => {
        const { codigo } = req.params;
        pool.query('SELECT * FROM usuario WHERE codigo = ?', [codigo], (errorUsuario, usuario) => {
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
    modificarUsuario: async(req, res) => {
        try {
            var codigo = req.body.codigo;
            var nombres = req.body.nombres;
            var apellidos = req.body.apellidos;
            var areaAdscripcion = req.body.area_adscripcion;
            var plazaLaboral = req.body.plaza_laboral;
            var numeroSocial = req.body.numeroSocial;
            var valuesUsuario = {
                nombres: nombres,
                apellidos: apellidos,
                area_adscripcion: areaAdscripcion,
                plaza_laboral: plazaLaboral,
                numero_social: numeroSocial,
                fecha_modificacion: new Date()
            };
            var sqlModificarUsuario = "UPDATE usuario SET nombres = ?, apellidos =?, area_adscripcion =?, plaza_laboral =?, numero_social = ? WHERE codigo = ?";
            pool.query(sqlModificarUsuario, [valuesUsuario], [codigo], (errorModificar, modificarUsuario) => {
                if (errorModificar) return res.json(errorModificar);

            });
        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
        res.json({ ok: true, mensaje: "Cuenta modificada" });

    }
}