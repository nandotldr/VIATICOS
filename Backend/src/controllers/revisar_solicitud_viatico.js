const pool = require('../database');
//const Utils = require('node-utils');
/*
 * La información se puede sacar de
 * req.body, req.get, req.params
 * respectivamente.
 */
module.exports = {

   

    consultarSolicitudesViatico:async (req, res) => {
        
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            console.log(existeUsuario);
            //si usuario es A mostrar todas las solocitudes de comison en status 3
            if(existeUsuario[0].tipo_usuario =='A')
            {
                console.log("TIPO USUARIO a");
                const viatico = await pool.query('SELECT v.id, v.status, u.codigo, u.area_adscripcion, v.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre FROM solicitud_viatico AS v INNER JOIN usuario as u ON u.codigo=v.id_usuario INNER JOIN solicitud_comision as c ON v.id_solicitud_comision = c.id WHERE v.status =3 ');
                    if (viatico.length < 1) res.json({ ok: false, mensaje: "No hay solicitudes de viaticos por aceptar" });
                    
                return res.json({ok:true, body: viatico});

            }
            else if(existeUsuario[0].tipo_usuario =='J')
            {
                const viatico = await pool.query('SELECT v.id, v.status, u.codigo, u.area_adscripcion, v.fecha_solicitud , c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre FROM solicitud_viatico AS v INNER JOIN usuario as u ON u.codigo=v.id_usuario INNER JOIN solicitud_comision as c ON v.id_solicitud_comision = c.id WHERE v.status =3 AND u.area_adscripcion = ? GROUP BY c.id',[existeUsuario[0].area_adscripcion]);
                    if (viatico.length < 1) res.json({ ok: false, mensaje: "No hay solicitudes de viaticos por aceptar" });
                    
                return res.json({ok:true, body: viatico});
            }

            res.json({ok: false, mensaje: "Funcion no disponible para tu usuario"})
            //si usuario es J mostrar las solicitudes de su dependencia
            
            
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: error });
        }

    },

    modificarViatico: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {            
            var sqlSolViatico ='SELECT c.id, c.status, u.codigo, c.fecha_solicitud , concat(u.nombres," ",u.apellidos) as nombre, u.tipo_usuario FROM solicitud_viatico AS c INNER JOIN usuario as u ON u.codigo = ? WHERE c.id = ? AND (c.status =1 OR c.status=3)';
            const verificarViatico = await pool.query(sqlSolViatico, [req.user.codigo,req.body.id]);
            console.log(req.body);
            console.log(verificarViatico);
            if (verificarViatico.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede modificar solicitud de viatico" });
            }  
            var modificarViatico='UPDATE solicitud_viatico SET ? WHERE id = ?';
            //si usuario =J modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if(verificarViatico[0].tipo_usuario =='J' && verificarViatico[0].status ==1){
                pool.query(modificarViatico, [{
                    fecha_modificacion: new Date(),
                    fecha_revisado:new Date(),
                    nombre_revisado: verificarViatico[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                },req.body.id], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ok: false, mensaje:errorModificar});
                        
                    });
                    return res.json({ ok: true, mensaje: "Viatico modificado" });
                 
            }
            else if (verificarViatico[0].tipo_usuario =='A' && verificarViatico[0].status ==3)
            {
                pool.query(modificarViatico, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado:new Date(),
                    nombre_aceptado: verificarViatico[0].nombre ,
                    comentario_rechazo: req.body.comentario_rechazo,
                    status: req.body.status,
                },req.body.id], (errorModificar, modificarComision) => {
                    if (errorModificar) return res.json({ok: false, mensaje:errorModificar});
                    console.log(errorModificar);
                        
                    });
                    return res.json({ ok: true, mensaje: "Viatico modificada" });
                
            }
            
            res.json({ok:false, mensaje:"No se hizo la revision correcta"});
        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: error});
        }
    }
}