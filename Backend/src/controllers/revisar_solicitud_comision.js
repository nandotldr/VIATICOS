const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {
    consultarSolicitudesComison:async (req, res) => {     
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.body.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            //si usuario es A mostrar todas las solocitudes de comison en status 3
            if(existeUsuario[0].tipo_usuario =='A')
            {
                console.log("TIPO USUARIO a");
                const comision = await pool.query('SELECT c.id, c.status, u.codigo, u.area_adscripcion,c.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo=c.id_usuario WHERE c.status =3');
                    if (comision.length < 1) res.json({ ok: false, mensaje: "No hay comisiones por aceptar" });
                    
                return res.json({ok:true, body: comision});

            }
            else if(existeUsuario[0].tipo_usuario =='J')
            {
                const comision = await pool.query('SELECT c.id, c.status, u.codigo, u.area_adscripcion,c.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre  FROM solicitud_comision AS c INNER JOIN usuario as u ON u.codigo=c.id_usuario WHERE c.status =1 AND u.area_adscripcion = ? group by c.id',[existeUsuario[0].area_adscripcion]);
                    if (comision.length < 1) res.json({ ok: false, mensaje: "No hay comisiones por aceptar" });
                    
                return res.json({ok:true, body: comision});
            }
            res.json({ok: false, mensaje: "Funcion no disponible para tu usuario"})
            //si usuario es J mostrar las solicitudes de su dependencia
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: error });
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