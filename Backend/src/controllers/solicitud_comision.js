const pool = require('../database');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

    crearSolicitudComision: async(req, res) => {

        try {
            const existeUsuario = await pool.query('SELECT codigo, area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            const existeSolicitud = await pool.query('SELECT * FROM solicitud_comision WHERE id_usuario= ? AND (status= 0 OR status=1 OR status=2 OR status=3 OR status=4 OR status=5)', [req.user.codigo]);
            if (existeSolicitud.length > 0) {
                return res.json({ ok: false, mensaje: "No puedes crear otra comision, tienes una en proceso" });
            }
            var pais = null;
            var municipio = null;
            if (req.body.tipo_comision == 0) { pais = req.body.id_destino; } else { municipio = req.body.id_destino; }
            if(pais == null && municipio == null){
                return res.json({ ok: false, mensaje: "No se envio id_destino" });
            }
            const resp = await pool.query('INSERT INTO solicitud_comision SET ?', [{
                id_usuario: req.user.codigo,
                nombre_comision: req.body.nombre_comision,
                tipo_comision: req.body.tipo_comision,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                id_pais: pais,
                area_adscripcion: existeUsuario[0].area_adscripcion,
                id_municipio: municipio,
                justificacion: req.body.justificacion,
                status: req.body.status,
                objetivo_trabajo: req.body.objetivo_trabajo,
                fecha_creacion: new Date(),
                fecha_solicitud: new Date()
            }]);
            let json = {
                "id_comision": resp.insertId
            };
            res.json({ ok: true, mensaje: "Comision creada correctamente", body: json });
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: 'Error inesperado' });

        }
    },

    consultarSolicitudComison: async(req, res) => {
        const { id } = req.params;
        try {
            const comision = await pool.query('SELECT * FROM solicitud_comision WHERE id = ?', [id]);
            if (comision.length < 1) return res.json({ ok: false, mensaje: "Comision no encontrada" });
            if (comision[0].tipo_comision == 0) {
                if(comision[0].id_pais == null ){
                    return res.json({ ok: false, mensaje: "Comision no tiene un pais asignado" })
                } 
                globalString = await pool.query('SELECT nombre FROM pais WHERE id = ?', [comision[0].id_pais]);
            } else if (comision[0].tipo_comision == 1) {
                if(comision[0].id_municipio == null ){
                    return res.json({ ok: false, mensaje: "Comision no tiene un municipio asignado" })
                } 
                globalString = await pool.query('SELECT nombre FROM municipio WHERE id = ?', [comision[0].id_municipio]);
            };
            pool.query('SELECT * FROM programa_trabajo WHERE id_solicitud_comision = ?', [comision[0].id], (errorPrograma, programa, fields) => {
                if (errorPrograma) return res.json({ ok: false, mensaje: 'Error al obtener el programa' });
                let json = {
                    folio: comision[0].id,
                    codigo: comision[0].id_usuario,
                    area_adscripcion: comision[0].area_adscripcion,
                    plaza_laboral: comision[0].plaza_laboral,
                    tipo_comision: comision[0].tipo_comision,
                    nombre_comision: comision[0].nombre_comision,
                    destino: globalString[0].nombre,
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
                    comentario_rechazo: comision[0].comentario_rechazo,
                    programa_trabajo: programa
                }
                res.json({ ok: true, body: json });
            });

        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }

    },


    modificarComision: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlSolComision = 'SELECT c.id, c.status, u.codigo, c.fecha_solicitud FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo = c.id_usuario WHERE c.id = ? AND c.id_usuario = ? AND (c.status =0 OR c.status=2 OR c.status=4)';
            const verificarComision = await pool.query(sqlSolComision, [req.body.id, req.user.codigo]);
            console.log(verificarComision);
            if (verificarComision.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede modificar comision" });
            }

            //si estatus =0 modificar fecha solicitud
            //si status =2 no modificar fecha solicitud or status 4
            if (verificarComision[0].status == 0 && req.body.status == 1)
                verificarComision[0].fecha_solicitud = new Date();
            var pais = null;
            var municipio = null;
            if (req.body.tipo_comision == 0) { pais = req.body.id_destino; } else { municipio = req.body.id_destino; }
            pool.query('UPDATE solicitud_comision SET ? WHERE id = ?', [{
                fecha_modificacion: new Date(),
                fecha_solicitud: verificarComision[0].fecha_solicitud,
                nombre_comision: req.body.nombre_comision,
                tipo_comision: req.body.tipo_comision,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin: req.body.fecha_fin,
                justificacion: req.body.justificacion,
                status: req.body.status,
                objetivo_trabajo: req.body.objetivo_trabajo,
            }, req.body.id], (errorModificar, modificarComision) => {
                if (errorModificar) return res.json({ ok: false, mensaje: 'Error al modificar la comision' });
                res.json({ ok: true, mensaje: "Solicitud comision se modifico correctamente" });
            });

        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    },
    historialComisones: async(req, res) => {
        try {
            pool.query('SELECT c.id as folio, c.status,c.fecha_solicitud , c.nombre_comision, c.tipo_comision  FROM solicitud_comision AS c INNER JOIN usuario as u on u.codigo=c.id_usuario WHERE c.id_usuario=?', [req.user.codigo], (errorComision, comisiones, fields) => {
                if (errorComision) return res.json({ ok: false, mensaje: errorComision });
                if (comisiones.length < 1) return res.json({ ok: false, mensaje: "No tienes comisiones" });


                res.json({ ok: true, body: comisiones });

            });

        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }

    },
    // Cosas extra como subir archivos etc
    subirInvitacion: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const comisiones = await pool.query('SELECT invitacion_evento FROM solicitud_comision WHERE id = ?', [req.body.id]);
            if (comisiones.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe la comisión.' });
            }
            // Rename al archivo
            let newFileName = `uploads/invitacion-${req.body.id}.${req.file.originalname.split('.')[1]}`;
            if (fs.existsSync(`uploads`)) {
                fs.renameSync(`uploads/${req.file.filename}`, newFileName, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }
            //Actualizar bd
            await pool.query('UPDATE solicitud_comision SET invitacion_evento = ? WHERE id = ?', [newFileName,req.body.id]);
            return res.json({ ok: true, mensaje: 'Archivo agregado.' })
            } catch (error) {
                res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
            }
    },

    subirPrograma: async(req, res) => {
        try {
            // Existe archivo
            if (!req.file) {
                return res.json({ ok: false, mensaje: 'No subiste ningun archivo.' });
            }
            // Existe la comision
            const comisiones = await pool.query('SELECT programa_evento FROM solicitud_comision WHERE id=?', [req.body.id]);
            if (comisiones.length === 0) {
                return res.json({ ok: false, mensaje: 'No existe la comisión.' });
            }
            // Rename al archivo
            let newFileName = `uploads/programa-${req.body.id}.${req.file.originalname.split('.')[1]}`;
            if (fs.existsSync(`uploads`)) {
                fs.renameSync(`uploads/${req.file.filename}`, newFileName, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
            }
            //Actualizar bd
            await pool.query('UPDATE solicitud_comision SET programa_evento = ? WHERE id = ?', [newFileName,req.body.id]);
            return res.json({ ok: true, mensaje: 'Archivo agregado.' })
            } catch (error) {
                res.json({ ok: false, err: error, mensaje: 'Ocurrio un error inesperado.' });
            }
    },
    downloadInvitacion: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM solicitud_comision WHERE id = ?', [id], (errorinvitacion, invitacion) => {
            if (errorinvitacion) return res.json({ ok: false, mensaje: 'No existe esta invitacion' });
            if (invitacion.length < 1) return res.json({ ok: false, mensaje: "No existe esta invitacion" });
            console.log(invitacion[0].invitacion_evento);
            res.download(invitacion[0].invitacion_evento);
        });
    },
    downloadPrograma: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT * FROM solicitud_comision WHERE id = ?', [id], (errorprograma, programa) => {
            if (errorprograma) return res.json({ ok: false, mensaje: 'No existe esta programa' });
            if (programa.length < 1) return res.json({ ok: false, mensaje: "No existe esta programa" });
            console.log(programa[0].programa_evento);
            res.download(programa[0].programa_evento);
        });
    },
}