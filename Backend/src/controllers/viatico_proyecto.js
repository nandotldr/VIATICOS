const pool = require('../database');

/*
* La información se puede sacar de
* req.body, req.get, req.params
* respectivamente.
*/

module.exports = {

    crearViaticoProyecto: async(req, res) => {
      var numero_proyecto = req.body.numero_proyecto;
      var cantidad = req.body.cantidad;
      var status = req.body.status;
      var id_solicitud_viatico = req.body.id_solicitud_viatico;

      var sqlProgram = "INSERT INTO viatico_proyecto SET ?";
      try{
        var valuesProject = {
          numero_proyecto: numero_proyecto,
          cantidad: cantidad,
          status: status,
          id_solicitud_viatico: id_solicitud_viatico,
          fecha_solicitud: new Date()
        };
        const resp = await pool.query(sqlProgram, [valuesProject]);
      }catch (e){
        return res.json({ ok: false, mensaje: e });
      }
      res.json({ ok: true, mensaje: "Proyecto creado" });
    },

    verViaticoProyecto: (req, res) => {
      const {codigo} = req.params;
      try{
        pool.query('SELECT * FROM viatico_proyecto WHERE id_solicitud_viatico = ?', [codigo], (errorProyecto, proyecto) => {
            if (errorProyecto) return res.json(errorProyecto);
            if (proyecto.length < 1) return res.json(proyecto);
            let json = {
                id_solicitud_viatico: proyecto[0].id_solicitud_viatico,
                numero_proyecto: proyecto[0].numero_proyecto,
                cantidad: proyecto[0].cantidad,
                status: proyecto[0].status,
                fecha_solicitud: proyecto[0].fecha_solicitud,
                fecha_aceptado: proyecto[0].fecha_aceptado,
                nombre_aceptado: proyecto[0].nombre_aceptado
            };

            res.json({ ok: true, body: json});
        });
      }catch(error){
        return res.json({ ok: false, mensaje: e});
      }
    },

    modificarViaticoProyecto: (req, res) => {
      try{
        pool.query('UPDATE viatico_proyecto SET ? WHERE id_solicitud_viatico = ?',[{
           id_solicitud_viatico: req.body.id_solicitud_viatico,
           numero_proyecto: req.body.numero_proyecto,
           cantidad: req.body.cantidad,
           status: req.body.status,
        },req.body.id_solicitud_viatico],(errorModificar, modificarProyecto) => {
          if(errorModificar) return res.json({ok:false, mensaje: "error al modificar"});
          res.json({ok:true, mensaje: "proyecto modificado exitosamente"});
        });
      }catch(e){
        return res.json({ ok: false, mensaje: e});
      }
    },

    eliminarProyecto: (req, res) => {
      var idProyecto = req.params;
        pool.query('DELETE FROM viatico_proyecto WHERE id_solicitud_viatico = ?', [idProyecto], (error, results) => {
            if(error) return res.json({ok: false, mensaje: error});
            res.json({ ok: true, results, mensaje: 'Proyecto eliminado'});
        });
    },

    insert: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'viaticoProyecto insert'});
        });
    },

    selectAll: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'viaticoProyecto selectAll'});
        });
    },

    select: (req, res) => {
        const { id } = req.params;
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'viaticoProyecto select'});
        });
    },

    update: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'viaticoProyecto update'});
        });
    },

    delete: (req, res) => {
        pool.query('SELECT NOW()', (error, results) => {
            if(error) return res.json(error);
            res.json({ ok: true, results, controller: 'viaticoProyecto delete'});
        });
    },

    // Cosas extra como subir archivos etc
}
