const pool = require('../database');

/*
* La información se puede sacar de
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    crearPrograma: async(req, res) => {
      try{
        //para crear programa solicitud comision debe estar en los estados 0,2,4
        const comision = await pool.query("SELECT id,id_usuario FROM solicitud_comision WHERE id_usuario = ? AND id= ? and (status=0 OR status= 2 and status=4)",[req.user.codigo,req.body.id_solicitud_comision]);
        if(comision.length < 1) return res.json({ ok: false, mensaje: "No se puede crear un programa, tu comision esta en revision" });
        const programa = await pool.query("INSERT INTO programa_trabajo SET ?",[{
          dia: req.body.dia,
          lugar_estancia: req.body.lugar_estancia,
          tareas_realizar: req.body.tareas_realizar,
          id_solicitud_comision: comision[0].id
        }]);
        res.json({ ok: true, mensaje: "Programa creado" });
      
      }catch (error){
        return res.json({ ok: false, mensaje: 'Error inesperado' });
      }
      
    },

    verPrograma: (req, res) => {
      const {id} = req.params;
      try{
        pool.query('SELECT * FROM programa_trabajo WHERE id_solicitud_comision = ?', [id], (errorPrograma, programa) => {
            console.log(errorPrograma);
            if (errorPrograma) return res.json({ok:false, mensaje: errorPrograma});
            if (programa.length < 1) return res.json({ok:false, mensaje: "No hay actividades registradas"});
            res.json({ ok: true, body: programa});
        });
      }catch(error){
        return res.json({ ok: false, mensaje: 'Error inesperado'});
      }
    },

    modificarPrograma: async (req, res) => {
      try{
        //para modificar programa solicitud comision debe estar en los estados 0,2,4
        const comision = await pool.query("SELECT id,id_usuario FROM solicitud_comision WHERE id_usuario = ? AND id= ? and (status=0 OR status= 2 and status=4)",[req.user.codigo,req.body.id_solicitud_comision]);
        if(comision.length < 1) return res.json({ ok: false, mensaje: "No se puede modificar un programa, tu comision esta en revision" });
        pool.query('UPDATE programa_trabajo SET ? WHERE id=? and id_solicitud_comision=?',[{
           dia: req.body.dia,
           lugar_estancia: req.body.lugar_estancia,
           tareas_realizar: req.body.tareas_realizar
        },req.body.id_programa,req.body.id_solicitud_comision],(errorModificar, modificarPrograma) => {
          if(errorModificar) return res.json({ok:false, mensaje: "error al modificar"});
          if(modificarPrograma.affectedRows < 1) return res.json({ok:false, mensaje: "No se modifico programa"});
          res.json({ok:true, mensaje: "Programa modificado exitosamente"});
        });
      }catch(error){
        return res.json({ ok: false, mensaje: 'Error inesperado'})
      }
    },

    eliminarPrograma: async (req, res) => {
      try{
        //para eliminar programa solicitud comision debe estar en los estados 0,2,4 y no debe ser el ultimo programa
        const comision = await pool.query("SELECT id,id_usuario FROM solicitud_comision WHERE id_usuario = ? AND id= ? and (status=0 OR status= 2 and status=4)",[req.user.codigo,req.body.id_solicitud_comision]);
        if(comision.length < 1) return res.json({ ok: false, mensaje: "No se puede eliminar un programa, tu comision esta en revision" });
        
        const numProgramaTrabajo =await pool.query("SELECT id FROM programa_trabajo WHERE id_solicitud_comision= ? ",[req.body.id_solicitud_comision]);
        if(numProgramaTrabajo.length == 1) return res.json({ok:false, mensaje: "No puedes eliminar el ultimo programa"});
        pool.query('DELETE FROM programa_trabajo WHERE id=? and id_solicitud_comision=?',[req.body.id_programa,req.body.id_solicitud_comision],(errorEliminar, eliminarPrograma) => {
          if(errorEliminar) return res.json({ok:false, mensaje: "Error al eliminar"});
          if(eliminarPrograma.affectedRows < 1) return res.json({ok:false, mensaje: "No se elimino programa"});
          res.json({ok:true, mensaje: "Programa eliminado exitosamente"});
        });
      }catch(error){
        return res.json({ ok: false, mensaje: 'Error inesperado'})
      }
        
    },
}
