const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

   

    consultarSolicitudComison: (req, res) => {
        const { id } = req.params;
        try {
            pool.query('SELECT * FROM solicitud_comision as c INNER JOIN  usuario as us ON  c.id_usuario = ? AND c.id=? ', [req.decoded.codigo, id],(errorComision, comision) => {
                if (errorComision) return res.json({ok:false, mensaje: errorComision});
                if (comision.length < 1) res.json({ ok: false, mensaje: "Comision no encontrada" });
                pool.query('SELECT * FROM programa_trabajo WHERE id_solicitud_comision = ?', [comision[0].id],(errorPrograma,programa,fields)=>{
                    if(errorPrograma) return res.json({ok:false, mensaje: errorPrograma});
                    let json = {
                        folio: comision[0].id,
                        codigo: comision[0].codigo,
                        area_adscripcion: comision[0].area_adscripcion,
                        plaza_laboral: comision[0].plaza_laboral,
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
                    res.json({ok:true, body:json});
                });
            });
            
        } catch (error) {
            return res.json({ ok: false, mensaje: e });
        }

    },


    modificarComision: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            
            var sqlSolComision ='SELECT c.id, c.status, u.codigo, c.fecha_solicitud , concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo = ? WHERE c.id = ? AND (c.status =1 OR c.status=3)';
            const verificarComision = await pool.query(sqlSolComision, [req.body.codigo,req.body.id]);
            console.log(req.body);
            console.log(verificarComision);
            if (verificarComision.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede modificar comison" });
            }  
            var modificarComision='UPDATE solicitud_comision SET ? WHERE id = ?';
            //si usuario =J modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if(verificarComision[0].tipo_usuario =='J' && verificarComision[0].status ==1){
                pool.query(modificarComision, [{
                    fecha_modificacion: new Date(),
                    fecha_revisado:new Date(),
                    nombre_revisado: verificarComision[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                },req.body.id], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ok: false, mensaje:errorModificar});
                        
                    });
                    return res.json({ ok: true, mensaje: "Comision modificada" });
                 
            }
            else if (verificarComision[0].tipo_usuario =='A' && verificarComision[0].status ==3)
            {
                pool.query(modificarComision, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado:new Date(),
                    nombre_aceptado: verificarComision[0].nombre ,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                },req.body.id], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ok: false, mensaje:errorModificar});
                    console.log(errorModificar);
                        
                    });
                    return res.json({ ok: true, mensaje: "Comision modificada" });
                
            }
            
            res.json({ok:false, mensaje:"No se hizo la revision correcta"});

            
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: error});
        }
    },
    
    
}