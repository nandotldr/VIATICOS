const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearUsuario: async(req, res) => {

        var nombre1 = req.body.nombre1;
        var nombre2 = req.body.nombre2;
        var apellido_p = req.body.apellidoP;
        var apellido_m = req.body.apellidoM;
        var area_adscripcion = req.body.areaAdscripcion;
        var codigo_trabajador = req.body.codigoTrabajador;
        var plaza_laboral = req.body.plazaLaboral;
        var username = req.body.usuario;
        var password = req.body.password;

        var sqlExisteTrabajador = "SELECT id_trabajador FROM trabajador WHERE codigo_trabajador= ?";
        var sqlExisteUsuario = "SELECT id_usuario FROM usuario WHERE username = ?";
        var sqlCuenta = "INSERT INTO trabajador SET ?";
        var sqlUsuario = "INSERT INTO usuario SET ?";


        try {

            const existeUsuario = await pool.query(sqlExisteUsuario, [username]);
            console.log(existeUsuario.length);
            if (existeUsuario.length > 0) {
                return res.json({ ok: false, mensaje: "Este usuario ya existe" });
            }
            const existeTrabajador = await pool.query(sqlExisteTrabajador, [codigo_trabajador]);
            if (existeTrabajador.length > 0) {
                return res.json({ ok: false, mensaje: "El trabajador ya existe" });
            }
            var valuesTrabajador = {
                nombre1: nombre1,
                nombre2: nombre2,
                apellido_p: apellido_p,
                apellido_m: apellido_m,
                area_adscripcion: area_adscripcion,
                codigo_trabajador: codigo_trabajador,
                plaza_laboral: plaza_laboral
            };

            const resp = await pool.query(sqlCuenta, [valuesTrabajador]);
            console.log("Trabajador Creado");
            console.log(resp.insertId);
            var id_trabajador = resp.insertId;
            var valuesUsuario = {
                username: username,
                password: password,
                tipo_user: tipo_user = 1,
                id_trabajador: id_trabajador
            };
            console.log(valuesUsuario);
            console.log("Usuario Creado");
            pool.query(sqlUsuario, [valuesUsuario], (error, results) => {
                if (error) return res.json(error);
            });

        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
        res.json({ ok: true, mensaje: 'Cuenta creada' })
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
            //res.json(programa);


        });
    },
    //D
    modificarUsuario: async(req, res) => {
        var id_trabajdor = req.body.idTrabajador;
        var nombre1 = req.body.nombre1;
        var nombre2 = req.body.nombre2;
        var apellido_p = req.body.apellidoP;
        var apellido_m = req.body.apellidoM;
        var area_adscripcion = req.body.areaAdscripcion;
        var codigo_trabajador = req.body.codigoTrabajador;
        var plaza_laboral = req.body.plazaLaboral;

        var valuesTrabajador = {
            nombre1: nombre1,
            nombre2: nombre2,
            apellido_p: apellido_p,
            apellido_m: apellido_m,
            area_adscripcion: area_adscripcion,
            codigo_trabajador: codigo_trabajador,
            plaza_laboral: plaza_laboral
        };
        var sqlModificarTrabajador = "UPDATE trabajador SET nombre1 =?, nombre2 =?, apellido_p =?, apellido_m =?, area_adscripcion =?, codigo_trabajador =?, plaza_laboral =? WHERE id_trabajador = ?";
        pool.query(sqlModificarTrabajador, [valuesTrabajador], [id_trabajador], (errorModificarTrabajador, modificarTrabajador) => {
            if (errorModificarTrabajador) return res.json(errorModificarTrabajador);
            res.json(modificarTrabajador);
        });




        try {
            var valuesTrabajador = {
                nombre1: nombre1,
                nombre2: nombre2,
                apellido_p: apellido_p,
                apellido_m: apellido_m,
                area_adscripcion: area_adscripcion,
                codigo_trabajador: codigo_trabajador,
                plaza_laboral: plaza_laboral
            };

            const resp = await pool.query(sqlCuenta, [valuesTrabajador]);
            console.log("Trabajador Creado");
            console.log(resp.insertId);
            var id_trabajador = resp.insertId;
            var valuesUsuario = {
                username: username,
                password: password,
                tipo_user: tipo_user = 1,
                id_trabajador: id_trabajador
            };
            console.log(valuesUsuario);
            console.log("Usuario Creado");

        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }

        pool.query(sqlUsuario, [valuesUsuario], (error, results) => {
            if (error) return res.json(error);
            res.json(results);
        });
    }
}