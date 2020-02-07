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
                return res.json({ ok: false, mensaje: "La comision no ha sido aprobada, solicitud de viatico rechazada" });
            }
            const existeViatico = await pool.query("SELECT id FROM solicitud_viatico WHERE id_solicitud_comision = ?", [req.body.id]);
            if (existeViatico.length > 0) return res.json({ ok: false, mensaje: "Esta comision ya tiene una solicitud de viatico en proceso" });
            const resp = await pool.query("INSERT INTO solicitud_viatico SET ? ", [{
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
            res.json({ ok: true, mensaje: "Viatico creado correctamente", body: json });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },
    consultarSolicitudViatico: async(req, res) => {
        const { id } = req.params;

        try {
            const viatico = await pool.query('SELECT v.id, v.id_solicitud_comision, v.invitado_nombre, v.comentarios, v.fecha_solicitud, c.justificacion, c.fecha_inicio,c.fecha_fin, v.status, v.fecha_revisado, v.nombre_revisado,v.fecha_aceptado,v.nombre_aceptado, c.tipo_comision, c.id_pais, c.id_municipio FROM viaticos.solicitud_viatico as v INNER JOIN viaticos.solicitud_comision as c ON  c.id = v.id_solicitud_comision where c.id=? ', [id]);
            if (viatico.length < 1) return res.json({ ok: false, mensaje: "No se ha creado viatico" });
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
                    nombre_invitado: viatico[0].invitado_nombre,
                    motivo_comision: viatico[0].justificacion,
                    lugar_de_comision: destino[0].nombre,
                    fecha_solicitud: viatico[0].fecha_solicitud,
                    comentarios: viatico[0].comentarios,
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
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }

    },
    modificarSolicitudViatico: async(req, res) => {
        try {
            const existeViatico = await pool.query("SELECT * FROM solicitud_viatico WHERE id = ? AND id_usuario=?", [req.body.id_viatico, req.user.codigo]);
            if (existeViatico.length < 1)
                return res.json({ ok: false, mensaje: 'No existe la solicitud viatico' });
            if (existeViatico[0].status == 0 && req.body.status == 1) {
                existeViatico[0].fecha_solicitud = new Date();
            }
            pool.query("UPDATE solicitud_viatico SET ? WHERE id = ?", [{
                status: req.body.status,
                fecha_solicitud: existeViatico[0].fecha_solicitud,
                fecha_modificacion: new Date(),
                comentarios: req.body.comentarios,
                invitado_nombre: req.body.nombre_invitado
            }, req.body.id_viatico], (errorModificar, moficarViatico) => {
                if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                res.json({ ok: true, mensaje: "Solicitud viatico se modifico correctamente" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error al realizar la modificacion" });
        }
    },
    historialViaticos: async(req, res) => {

        try {
            pool.query('SELECT v.id as id_viatico, v.id_solicitud_comision as id_comision,v.fecha_solicitud, v.status , c.nombre_comision FROM solicitud_viatico as v INNER  JOIN solicitud_comision as c on c.id =v.id_solicitud_comision WHERE v.id_usuario =?', [req.user.codigo], (erroViaticos, viaticos, fields) => {
                if (erroViaticos) return res.json({ ok: false, mensaje: erroViaticos });
                if (viaticos.length < 1) return res.json({ ok: false, mensaje: "No tienes viaticos realizados" });
                res.json({ ok: true, body: viaticos });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },

    // Cosas extra como subir archivos etc
}