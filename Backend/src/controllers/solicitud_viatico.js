const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearSolicitudViatico: async(req, res) => {
        var id_comision = req.body.id;
        var id_usuario = req.user.codigo;
        var invitado_n = req.body.invitado;
        var comentarios = req.body.comentarios;
        var status = req.body.estado;
        var buscarSolicitudC = 'SELECT * FROM solicitud_comision WHERE id = ?';
        var insertarSolicitud = 'INSERT INTO solicitud_viatico SET ?';

        try {
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            const existeSolicitud = await pool.query('SELECT * FROM solicitud_comision WHERE id = ? AND status=5', [id_comision]);
            if (existeSolicitud.length < 1) {
                return res.json({ ok: false, mensaje: "Comision no ha sido aprovada" });
            }
            const existe = await pool.query(buscarSolicitudC, [id_comision]);
            console.log(invitado_n);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe la comision' });
            var valuesSolicitud = {
                invitado_nombre: invitado_n,
                id_solicitud_comision: id_comision,
                comentarios: comentarios,
                status: status,
                fecha_solicitud: new Date(),
                comentario_rechazo: '',
                fecha_revisado: new Date(),
                nombre_revisado: '',
                fecha_aceptado: new Date(),
                nombre_aceptado: '',
                fecha_creacion: new Date(),
                fecha_modificacion: new Date(),
                id_usuario: id_usuario
            };

            pool.query(insertarSolicitud, [valuesSolicitud], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'solicitudViatico insertado', mensaje: 'ok', ultimaid: results.insertId });
            });
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