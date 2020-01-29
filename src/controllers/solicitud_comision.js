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

    consultarSolicitudComison: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM solicitud_comision WHERE id = ? ', [id], (errorComision, comision) => {

            if (errorComision) return res.json(errorComision);
            if (comision.length < 1) res.json({ ok: false, mensaje: "Comision no encontrada" });
            pool.query('SELECT * FROM usuario WHERE codigo = ?',[comision[0].id_usuario],(errorUsuario,usuario)=>{
                if (errorUsuario) return res.json(errorUsuario);
                if (usuario.length < 1) res.json({ ok: false, mensaje: "Usuario no encontrado" });

                pool.query('SELECT * FROM programa_trabajo WHERE id_solicitud_comision = ?', [comision[0].id],(errorPrograma,programa,fields)=>{
                    if(errorPrograma) return res.json(errorPrograma);

                    let json = {
                        folio: comision[0].id,
                        codigo: usuario[0].codigo,
                        area_adscripcion: usuario[0].area_adscripcion,
                        plaza_laboral: usuario[0].plaza_laboral,
                        tipo_comision: comision[0].tipo_comision,
                        nombre_comision: comision[0].nombre_comision,
                        id_pais: comision[0].id_pais,
                        id_municipio: comision[0].id_municipio,
                        fecha_solicitud: comision[0].fecha_solicitud,
                        fecha_inicio: comision[0].fecha_inicio,
                        fecha_fin: comision[0].fecha_fin,
                        status: comision[0].status,
                        justificacion: comision[0].justificacion,
                        objetivo_trabajo: comision[0].objetivo_trabajo,
                        programa_evento: comision[0].programa_evento,
                        invitacion_evento: comision[0].invitacion_evento,
                        fecha_revisado: comision[0].fecha_revisado,
                        fecha_aceptado: comision[0].fecha_aceptado,
                        nombre_revisado: comision[0].nombre_revisado,
                        nombre_aceptado: comision[0].nombre_aceptado,
                        programa_trabajo: programa
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