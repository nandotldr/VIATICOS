const pool = require('../database');

/*
* La información se puede sacar de
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    crearPrograma: async(req, res) => {
      var dia = req.body.dia;
      var lugar_estancia = req.body.lugar_estancia;
      var tareas_realizar = req.body.tareas_realizar;
      var id_solicitud_comision = req.body.id_comision;

      var sqlProgram = "INSERT INTO programa_trabajo SET ?";
      try{
        var valuesProgram = {
          dia: dia,
          lugar_estancia: lugar_estancia,
          tareas_realizar: tareas_realizar,
          id_solicitud_comision: id_solicitud_comision
        };
        const resp = await pool.query(sqlProgram, [valuesProgram]);
      }catch (e){
        return res.json({ ok: false, mensaje: e });
      }
      res.json({ ok: true, mensaje: "Programa creado" });
    },

    verPrograma: (req, res) => {
      const {id} = req.params;
      try{
        pool.query('SELECT * FROM programa_trabajo WHERE id_solicitud_comision = ?', [id], (errorPrograma, programa) => {
            console.log(errorPrograma);
            if (errorPrograma) return res.json({ok:false, mensaje: errorPrograma});
            if (programa.length < 1) return res.json({ok:false, mensaje: "no existe programa"});

            res.json({ ok: true, body: programa});
        });
      }catch(e){
        return res.json({ ok: false, mensaje: e});
      }
    },

    modificarPrograma: (req, res) => {
      try{
        pool.query('UPDATE programa_trabajo SET ? WHERE id_solicitud_comision = ?',[{
           dia: req.body.dia,
           lugar_estancia: req.body.lugar_estancia,
           tareas_realizar: req.body.tareas_realizar,
           id_solicitud_comision: req.body.id_comision,
        },req.body.id_comision],(errorModificar, modificarPrograma) => {
          if(errorModificar) return res.json({ok:false, mensaje: "error al modificar"});
          res.json({ok:true, mensaje: "programa modificado exitosamente"});
        });
      }catch(e){
        return res.json({ ok: false, mensaje: e})
      }
    },

    eliminarPrograma: (req, res) => {
      var idProgram = req.params;
        pool.query('DELETE FROM programa_trabajo WHERE id_solicitud_comision = ?', [idProgram], (error, results) => {
            if(error) return res.json({ok: false, mensaje: error});
            res.json({ ok: true, results, mensaje: 'Programa eliminado'});
        });
    },
}
