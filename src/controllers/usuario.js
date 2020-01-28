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
        var tipoUsuario = req.body.tipo_usuario;
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
                tipo_usuario: tipoUsuario,
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
        const { id } = req.params;
        pool.query('SELECT * FROM trabajador WHERE id_trabajador = ?', [id], (errorCuenta, cuenta) => {
            if (errorCuenta) return res.json(errorCuenta);
            if (cuenta.lenght < 1) return res.json(cuenta);

            let json = {
                nombre1: cuenta[0].nombre1,
                nombre2: cuenta[0].nombre2,
                apellidoP: cuenta[0].apellidoP,
                apellidoM: cuenta[0].apellidoM,
                codigo_trabajador: cuenta[0].codigo_trabajador,
                area_adscripcion: cuenta[0].area_adscripcion,
                plazaLaboral: cuenta[0].plaza_laboral
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