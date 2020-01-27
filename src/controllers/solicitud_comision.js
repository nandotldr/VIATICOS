const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

    guardarComision: async(req, res) => {
        //utilities.validarParametros([req.body.folio, req.body.fechaCreacion, req.body.fechaEnvio, req.body.fechaAprobacion, req.body.estatus, req.body.codigoTrabajador, req.body.nombreSolicitante, req.body.areaAdscripcion, req.body.tipo, req.body.destino, req.body.plazaLaboral, req.body.justificacion, req.body.programaTrabajo, req.body.objetivoTrabajo, req.body.evento, req.body.dia, req.body.fecha, req.body.lugar, req.body.tareas, req.body.invitacionEvento, req.body.programaEvento]).then(comision(){
        //Define variables locales:


        var codigo_trabajador = req.body.codigoTrabajador;
        var nombre1 = req.body.nombreSolicitante;
        var area_adscripcion = req.body.areaAdscripcion;
        var tipo_comision = req.body.tipo;
        var comision_lugar = req.body.destino;
        var fechaArrivo = req.body.arrivo;
        var fechaSalida = req.body.salida;
        var plaza_laboral = req.body.plazaLaboral;
        var justificacion = req.body.justificacion;
        var programaTrabajo = req.body.programaTrabajo;
        var objetivo_trabajo = req.body.objetivoTrabajo;
        var nombre_comision = req.body.evento;
        var tipo_estatus = req.body.estatus;
        //  var numero_dia = req.body.programa.dia;
        //  var dia = req.body.programa.fecha;
        var programa = req.body.programa;
        //  var lugar_estancia = req.body.programa.lugar;
        // var tareas = req.body.programa.tareas;
        var invitacionEvento = req.body.invitacionEvento;
        var programaEvento = req.body.programaEvento;

        //console.log(req.body);
        var sqlExisteTrabajador = "SELECT id_trabajador FROM trabajador WHERE codigo_trabajador = ?";
        var sqlComision = "INSERT INTO comision SET ?";
        var sqlPrograma = "INSERT INTO programa_trabajo SET ?";
        var sqlLugarNac = "INSERT INTO comision_lugarnac SET ?";

        try {

            const existe = await pool.query(sqlExisteTrabajador, [codigo_trabajador]);
            if (existe.leangth == 0) {
                return res.json({ ok: false, mensaje: 'No existe este trabajador' });
            }
            const id_estatus = await pool.query('SELECT idestatus FROM estatus WHERE tipo_estatus = ?', [tipo_estatus]);

            var valuesComision = {
                id_trabajador: existe[0]['id_trabajador'],
                nombre_comision: nombre_comision,
                tipo_comision: tipo_comision,
                objetivo_trabajo: objetivo_trabajo,
                fecha_creacion: new Date(),
                invitacionEvento: invitacionEvento,
                programaEvento: programaEvento,
                justificacion: justificacion,
                idestatus: id_estatus[0].idestatus
            };

            const resp = await pool.query(sqlComision, [valuesComision]);
            console.log("comision creada");

            var id_comision = resp.insertId;

            if (tipo_comision == 0) {
                var valuesDestino = {
                    fechaArrivo: fechaArrivo,
                    fechaPartida: fechaSalida,
                    id_comision: id_comision,
                    id_pais: comision_lugar

                };
                console.log(valuesDestino);
                pool.query('INSERT INTO comision_lugarext SET ?', [valuesDestino]);
            } else if (tipo_comision == 1) {
                console.log("Comision Nacional");
                var valuesDestinoNacional = {
                    fechaArrivo: fechaArrivo,
                    fechaPartida: fechaSalida,
                    id_comision: id_comision,
                    id_municipio: comision_lugar
                };
                console.log(valuesDestinoNacional);
                pool.query(sqlLugarNac, [valuesDestinoNacional]);
                //console.log(nacional);
            };
            programa.forEach((item, i) => {
                console.log("Iterando programa");
                console.log(item);
                var valuesPrograma = {
                    dia: item.fecha,
                    numero_dia: item.dia,
                    lugar_estancia: item.lugar,
                    tareas: item.tareas,
                    id_comision: id_comision
                };
                pool.query(sqlPrograma, [valuesPrograma]);
            });

        } catch (e) {
            return res.json({ ok: false, mensaje: e });
        }
        res.json({ ok: true, mensaje: "Comision creada" });
    },

    selectComision: (req, res) => {
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
}