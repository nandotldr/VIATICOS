const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    insert: async(req, res) => {
        
        
        try{
        var id_viatico = req.body.id_solicitud_viatico;
        var dias = req.body.dia;
        var rubro = req.body.rubro;
        var cantidad = req.body.cantidad;
        var proyecto = req.body.proyecto;
        var estatus = req.body.estatus;

        var buscarSolicitudV = 'SELECT id FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)';
        var insertarGasto = 'INSERT INTO gasto SET ?';
        
            cantidad = (cantidad < 1) ? 0:cantidad;

            const existe = await pool.query(buscarSolicitudV, [id_viatico]);
            if (existe.length == 0)
                return res.json({ ok: false, mensaje: 'No existe el viatico o no se puede crear con el estatus actual' });
            var valuesSolicitud = {
                dia: dias,
                rubro: rubro,
                cantidad: cantidad,
                proyecto: proyecto,
                estatus: estatus,
                id_solicitud_viatico: id_viatico
            };
            pool.query(insertarGasto, [valuesSolicitud], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'Gasto insertado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }


    },

    /*selectAll: (req, res) => {
            pool.query('SELECT * FROM gasto', (error, results) => {
                if(error) return res.json(error);
                    res.json({ ok: true, results, controller: 'conceptoGasto selectAll'});
            });
        
    },*/

    select: (req, res) => {
        const { id } = req.params;
        var consultaGasto = 'SELECT * FROM gasto WHERE id_solicitud_viatico = ?';
        pool.query(consultaGasto, [id], (error, results) => {
            if (error) return res.json(error, 'Error al consultar el gasto');
            res.json({ ok: true, results, controller: 'conceptoGasto select' });
        });
    },

    selectOne: async (req, res) => {
        const { id } = req.params;
        var consultaGasto = 'SELECT * FROM gasto WHERE id = ?';
        gasto = await pool.query(consultaGasto, [id]);
        if(!gasto.length)
            return res.json({ ok: false, mensaje: 'No existe el gasto' });
        res.json({ ok: true, body: gasto[0], mensaje: '' });
    },

    update: async(req, res) => {
        var idGasto = req.body.idGasto;
        var idSolViatico = req.body.idViatico;
        var dias = req.body.dia;
        var rubro = req.body.rubro;
        var cantidad = req.body.cantidad;
        var proyecto = req.body.proyecto;
        var estatus = req.body.estatus;

        var buscarSolicitudG = 'SELECT id FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)';
        var actualizarSolicitudG = 'UPDATE gasto SET ? AND id = ?';

        try {
            const existe = await pool.query(buscarSolicitudG, [idSolViatico]);
            if (!existe.length)
                return res.json({ ok: false, mensaje: 'El gasto no puede ser modificado actualmente' });
            var valuesGasto = {
                dia: dias,
                rubro: rubro,
                cantidad: cantidad,
                proyecto: proyecto,
                estatus: estatus,
            };
            pool.query(actualizarSolicitudG, [valuesGasto, idGasto], (error, results) => {
                if (error) return res.json(error);
                res.json({ ok: true, results, controller: 'Gasto actualizado', mensaje: 'ok' });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    },

    delete: async(req, res) => {
        const cuantos = await pool.query('SELECT * FROM gasto WHERE id_solicitud_viatico = ?', [req.body.idV]);
        if (cuantos.length <= 1)
            return res.json({ ok: false, mensaje: 'El viatico no puede quedar sin gastos o no tiene gastos actualmente' });
        const verificar = await pool.query('SELECT * FROM solicitud_viatico WHERE id = ? AND (status = 0 OR status = 2 OR status = 4)', [req.body.idV]);
        if (!verificar.length)
            return res.json({ ok: false, mensaje: 'El gasto no puede ser eliminado actualmente' });
        pool.query('DELETE FROM gasto WHERE id = ?', [req.body.id], (error, results) => {
            if (error) return res.json(error);
            res.json({ ok: true, results, controller: 'Gasto borrado', mensaje: 'Gasto eliminado' });
        });
    },
    gastosPorRevisar: async(req, res) => {
        try {
            //Verificar tipo de usuario
            const existeUsuario = await pool.query('SELECT codigo, tipo_usuario,area_adscripcion FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 0) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            //si usuario es A mostrar todas las solocitudes de comison en status 3
            if (existeUsuario[0].tipo_usuario == 'A') {
                const gasto = await pool.query('SELECT gasto.dia, gasto.estatus, gasto.id as id_gasto,gasto.rubro, gasto.cantidad, gasto.proyecto, c.id as id_comision, c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre FROM solicitud_comision AS c  INNER JOIN usuario as u ON u.codigo=c.id_usuario INNER JOIN solicitud_viatico ON c.id = solicitud_viatico.id_solicitud_comision INNER JOIN gasto ON solicitud_viatico.id = gasto.id_solicitud_viatico WHERE gasto.estatus = 1');
                if (gasto.length < 1) return res.json({ ok: false, mensaje: "No hay gastos por aceptar" });

                return res.json({ ok: true, body: gasto });

            } else if (existeUsuario[0].tipo_usuario == 'F') {
                const gasto = await pool.query('SELECT gasto.dia, gasto.estatus, gasto.id as id_gasto,gasto.rubro, gasto.cantidad, gasto.proyecto, c.id as id_comision, c.nombre_comision,concat(u.nombres," ",u.apellidos) as nombre FROM solicitud_comision AS c  INNER JOIN usuario as u ON u.codigo=c.id_usuario INNER JOIN solicitud_viatico ON c.id = solicitud_viatico.id_solicitud_comision INNER JOIN gasto ON solicitud_viatico.id = gasto.id_solicitud_viatico WHERE gasto.estatus = 0', [existeUsuario[0].area_adscripcion]);
                if (gasto.length < 1) return res.json({ ok: false, mensaje: "No hay gastos por aceptar" });

                return res.json({ ok: true, body: gasto });
            }
            res.json({ ok: false, mensaje: "Funcion no disponible para tu usuario" })
                //si usuario es J NO FUNCIONA JEJE mostrar las solicitudes de su dependencia 
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }

    },

    aceptarGasto: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlSolGasto = 'SELECT gasto.dia, gasto.estatus, gasto.id as id_gasto,gasto.rubro, gasto.cantidad, gasto.proyecto FROM gasto  WHERE gasto.id = ? AND gasto.estatus = 1 || gasto.estatus = 0';
            const verificarGasto = await pool.query(sqlSolGasto, [req.body.id]);
            if (verificarGasto.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede aceptar el gasto" });
            }
            const usuario = await pool.query("SELECT CONCAT(u.nombres, ' ' , u.apellidos) as nombre FROM viaticos.usuario as u WHERE codigo = ?", [req.user.codigo]);
            console.log(verificarGasto,req.user);
            var modificarGasto = 'UPDATE gasto SET ? WHERE id = ?';
            //si usuario =J modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (req.user.tipo_usuario == 'F' && verificarGasto[0].estatus == 0) {
                pool.query(modificarGasto, [{
                    fecha_modificacion: new Date(),
                    fecha_revisado: new Date(),
                    nombre_revisado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    estatus: 1,
                }, req.body.id_comision], (errorModificar, modificarGasto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarGasto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });


                });
                return res.json({ ok: true, mensaje: "Gasto aceptado" });

            } else if (req.user.tipo_usuario == 'A' && verificarGasto[0].estatus == 1) {
                console.log("usuario A");
                pool.query(modificarGasto, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado: new Date(),
                    nombre_aceptado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    estatus: 3,
                }, req.body.id_comision], (errorModificar, modificarGasto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarGasto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });

                });
                return res.json({ ok: true, mensaje: "Gasto aceptado" });

            }
            res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },

    rechazarGasto: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por J =3, aceptado por A= 5 o finalizado
        try {
            var sqlSolGasto = 'SELECT gasto.dia, gasto.estatus, gasto.id as id_gasto,gasto.rubro, gasto.cantidad, gasto.proyecto FROM gasto  WHERE gasto.id = ? AND gasto.estatus = 1 || gasto.estatus = 0';
            const verificarGasto = await pool.query(sqlSolGasto, [req.body.id]);
            if (verificarGasto.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede aceptar el gasto" });
            }
            const usuario = await pool.query("SELECT CONCAT(u.nombres, ' ' , u.apellidos) as nombre FROM viaticos.usuario as u WHERE codigo = ?", [req.user.codigo]);
            console.log(verificarGasto,req.user);
            var modificarGasto = 'UPDATE gasto SET ? WHERE id = ?';
            //si usuario =J modifcar fecha revisado, nombre revisado, comentario rechazo
            //si usuario =A modificar fecha_aceptado, nombre aceptado, comentario rechazo
            if (req.user.tipo_usuario == 'F' && verificarGasto[0].estatus == 0) {
                pool.query(modificarGasto, [{
                    fecha_modificacion: new Date(),
                    fecha_revisado: new Date(),
                    nombre_revisado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    estatus: 2,
                }, req.body.id_comision], (errorModificar, modificarGasto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarGasto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });


                });
                return res.json({ ok: true, mensaje: "Gasto rechazado" });

            } else if (req.user.tipo_usuario == 'A' && verificarGasto[0].estatus == 1) {
                console.log("usuario A");
                pool.query(modificarGasto, [{
                    fecha_modificacion: new Date(),
                    fecha_aceptado: new Date(),
                    nombre_aceptado: usuario[0].nombre,
                    comentario_rechazo: req.body.comentario_rechazo,
                    estatus: 2,
                }, req.body.id_comision], (errorModificar, modificarGasto) => {
                    if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                    if (modificarGasto.affectedRows < 1) return res.json({ ok: false, mensaje: "No se acepto la comision" });

                });
                return res.json({ ok: true, mensaje: "Gasto rechazado" });

            }
            res.json({ ok: false, mensaje: "No se hizo la revision correcta" });
        } catch (error) {
            return res.json({ ok: false, mensaje: "Error inesperado" });
        }
    },

    // Cosas extra como subir archivos etc
}