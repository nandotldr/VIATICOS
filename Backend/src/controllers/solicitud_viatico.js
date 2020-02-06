const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearSolicitudViatico: async(req, res) => {
        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            const existeSolicitud = await pool.query('SELECT * FROM solicitud_comision WHERE id = ? AND status=5', [req.body.id]);
            if (existeSolicitud.length < 1) {
                return res.json({ ok: false, mensaje: "La comision no ha sido aprobada, solicitud de viatico rechazada"});
            }
            const existeViatico = await pool.query("SELECT id FROM solicitud_viatico WHERE id_solicitud_comision = ?",[req.body.id]);
            if(existeViatico.length > 0) return res.json({ ok: false, mensaje: "Esta comision ya tiene una solicitud de viatico en proceso"});
            const resp= await pool.query("INSERT INTO solicitud_viatico SET ? ", [{
                    invitado_nombre: req.body.invitado,
                    id_solicitud_comision: req.body.id,
                    comentarios: req.body.comentarios,
                    status: req.body.estado,
                    fecha_solicitud: new Date(), 
                    fecha_creacion: new Date(),
                    id_usuario: req.user.codigo
                }]);
            let json = {
                "id_viatico": resp.insertId
            };
            res.json({ ok: true, mensaje: "Viatico creado correctamente", body: json});
        } catch (error) {
            return res.json({ ok: false, mensaje: error });
        }
    },


    consultarSolicitudViatico: async(req, res) => {
        const { id } = req.params;

        try {
            const viatico = await pool.query('SELECT * FROM solicitud_viatico as v INNER JOIN solicitud_comision as c ON  c.id = v.id_solicitud_comision where c.id=? ', [id]);
            if (viatico.length < 1) return res.json({ ok: false, mensaje: "No se encontro viatico" });
            if (viatico[0].tipo_comision == 0) {
                destino = await pool.query('SELECT nombre FROM pais WHERE id = ?', [viatico[0].id_pais]);
            } else if (viatico[0].tipo_comision == 1) {
                destino = await pool.query('SELECT nombre FROM municipio WHERE id = ?', [viatico[0].id_municipio]);
            };

            pool.query('SELECT * FROM gasto WHERE id_solicitud_viatico = ?', [viatico[0].id], (errorGasto, gastos, fields) => {
                if (errorGasto) return res.json({ ok: false, mensaje: errorGasto });
                let json = {
                    folio: viatico[0].id,
                    no_comision: viatico[0].id_solicitud_comision,
                    motivo_comision: viatico[0].justificacion,
                    lugar_de_comision: destino[0].nombre,
                    fecha_solicitud: viatico[0].fecha_solicitud,
                    fecha_inicio: viatico[0].fecha_inicio,
                    fecha_fin: viatico[0].fecha_fin,
                    status: viatico[0].status,
                    fecha_revisado: viatico[0].fecha_revisado,
                    fecha_aceptado: viatico[0].fecha_aceptado,
                    nombre_revisado: viatico[0].nombre_revisado,
                    nombre_aceptado: viatico[0].nombre_aceptado,
                    gastos: gastos
                }
                res.json({ ok: true, body: json });
            });


        } catch (error) {
            console.log(error);
            return res.json({ ok: false, mensaje: error });
        }

    },

    modificarSolicitudViatico: async(req, res) => {
        var idSolViatico = req.body.id_solicitudV;
        var status = req.body.estado;
        var comentarios = req.body.comentario;
        var nom_invitado = req.body.nombre_invitado;
        var id_usuario = req.user.codigo;
        var buscarSolicitudV = 'SELECT * FROM solicitud_viatico WHERE id = ?';
        var actualizarSolicitudV = 'UPDATE solicitud_viatico SET ? WHERE id = ?';

        try {
            const existe = await pool.query(buscarSolicitudV, [idSolViatico]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la solicitud' });
            var valuesSolicitud = {
                status: status,
                fecha_solicitud: new Date(),
                fecha_modificacion: new Date(),
                comentarios: comentarios,
                invitado_nombre: nom_invitado
            };
            pool.query(actualizarSolicitudV, [valuesSolicitud, idSolViatico], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'solicitudViatico actualizado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error al realizar la query" });
        }
    }

    // Cosas extra como subir archivos etc
}