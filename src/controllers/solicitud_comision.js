const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

    crearSolicitudComision: async(req, res) => {
        //Define variables locales:
        //console.log(req.body);
        var codigoUsuario = req.body.codigo;
        var tipo_comision = req.body.tipo_comision;
        var comisionLugar = req.body.id_destino;
        var fechaInicio = req.body.fecha_inicio;
        var fechaFin = req.body.fecha_fin;
        var justificacion = req.body.justificacion;
        var estatus_comision = req.body.status;
        var objetivo_trabajo = req.body.objetivo_trabajo;
        var nombre_comision = req.body.nombre_comision;
        var urlProgramaEvento = req.body.programa_evento;
        var urlInvitacion = req.body.invitacion_evento;
       // console.log(req.body);
        var pais = null;
        var municipio = null;
        var sqlComision = "INSERT INTO solicitud_comision SET ?";
        try {

            if(tipo_comision ==0){ pais = comisionLugar;}
            else { municipio = comisionLugar;}

            var valuesComision = {
                id_usuario: codigoUsuario,
                nombre_comision: nombre_comision,
                tipo_comision: tipo_comision,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                id_pais: pais,
                id_municipio: municipio,
                justificacion: justificacion,
                status: estatus_comision,
                objetivo_trabajo: objetivo_trabajo,
                programa_evento:urlProgramaEvento,
                invitacion_Evento: urlInvitacion,
                fecha_creacion: new Date(),
                fecha_solicitud: new Date()
            };
           // console.log(valuesComision);
            const resp = await pool.query(sqlComision, [valuesComision]);
            //console.log(resp);
        } catch (e) {
            //console.log(e);
            return res.json({ ok: false, mensaje: e });

        }
        res.json({ ok: true, mensaje: "Comision creada" });
    },

    select_solicitud_comision: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM comision WHERE id_comision = ?', [id], (errorComision, comision) => {
            if (errorComision) return res.json(errorComision);
            if (comision.lenght < 1) return res.json(comision);

            pool.query('SELECT * FROM programa_trabajo WHERE id_comision = ?', [comision[0].id_comision], (errorPrograma, programa, fields) => {
                if (errorPrograma) return res.json(errorPrograma);
                pool.query('SELECT * FROM trabajador WHERE id_trabajador = ?', [comision[0].id_trabajador], (errorTrabajador, trabajador) => {
                    if (errorTrabajador) return res.json(errorTrabajador);

                    let json = {

                        folio: comision[0].id_comision,
                        fechaCreacion: comision[0].fecha_creacion,
                        fechaEnvio: comision[0].fecha_envio,
                        estatus: comision[0].idestatus,
                        codigoTrabajador: trabajador[0].codigoTrabajador,
                        nombreSolicitante: trabajador[0].nombre1,
                        area_adscripcion: trabajador[0].area_adscripcion,
                        tipo: comision[0].tipo_comision,
                        fecha_envio: comision[0].fecha_envio,
                        destino: programa[0].lugar_estancia,
                        plazaLaboral: trabajador[0].plaza_laboral,
                        justificacion: comision[0].justificacion,
                        programaTrabajo: programa[0].id_programa,
                        objetivoTrabajo: comision[0].objetivo_trabajo,
                        evento: comision[0].nombre_comision,
                        programa: programa,
                        invitacionEvento: comision[0].invitacionEvento,
                        programaEvento: comision[0].programaEvento
                    }

                    res.json(json);
                    //res.json(programa);
                });
            });
        });
    },


    update: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if (error) return res.json(error);
            res.json({ ok: true, results, controller: 'comision update' });
        });
    },

    delete: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if (error) return res.json(error);
            res.json({ ok: true, results, controller: 'comision delete' });
        });
    },
    // Cosas extra como subir archivos etc
    subirInvitacion: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const comisiones = await pool.query('SELECT invitacionEvento FROM comision WHERE id_comision=?', [req.body.id_comision]);
            if (comisiones.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe la comisión.' });
            }
            // Cual es el archivo 
            let currentFile = comisiones[0].invitacionEvento;
            // Mover archivo nuevo
            let newFileName = `${uniqid()}.${req.file.originalname.split('.')[1]}`;
            if (!fs.existsSync(`public/files/${req.body.id_comision}`)) {
                fs.mkdirSync(`public/files/${req.body.id_comision}`);
            }
            fs.renameSync(req.file.path, `public/files/${req.body.id_comision}/${newFileName}`);
            // Actuvalizar bd
            await pool.query('UPDATE comision SET invitacionEvento=? WHERE id_comision=?', [newFileName, req.body.id_comision]);
            // Borrar archivo antiguo si existe
            if (fs.existsSync(`public/files/${req.body.id_comision}/${currentFile}`)) {
                fs.unlinkSync(`public/files/${req.body.id_comision}/${currentFile}`);
            }
            res.json({ ok: true, mensaje: 'Archivo agregado.' })
        } catch (error) {
            res.json({ ok: false, error, mensaje: 'Ocurrio un error inespedado.' });
        }
    },

    subirPrograma: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const comisiones = await pool.query('SELECT programaEvento FROM comision WHERE id_comision=?', [req.body.id_comision]);
            if (comisiones.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe la comisión.' });
            }
            // Cual es el archivo 
            let currentFile = comisiones[0].programaEvento;
            // Mover archivo nuevo
            let newFileName = `${uniqid()}.${req.file.originalname.split('.')[1]}`;
            if (!fs.existsSync(`public/files/${req.body.id_comision}`)) {
                fs.mkdirSync(`public/files/${req.body.id_comision}`);
            }
            fs.renameSync(req.file.path, `public/files/${req.body.id_comision}/${newFileName}`);
            // Actuvalizar bd
            await pool.query('UPDATE comision SET programaEvento=? WHERE id_comision=?', [newFileName, req.body.id_comision]);
            // Borrar archivo antiguo si existe
            if (fs.existsSync(`public/files/${req.body.id_comision}/${currentFile}`)) {
                fs.unlinkSync(`public/files/${req.body.id_comision}/${currentFile}`);
            }
            res.json({ ok: true, mensaje: 'Archivo agregado.' })
        } catch (error) {
            res.json({ ok: false, error, mensaje: 'Ocurrio un error inespedado.' });
        }
    },
}