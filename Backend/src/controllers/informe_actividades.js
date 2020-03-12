const pool = require('../database');

/*
 * La información se puede sacar de 
 * req.body, req.get, req.params
 * respectivamente.
 */

module.exports = {

    crearInforme: async(req, res) => {
        try {
            //verificar que la solicitud de viaticos este en status 5
            const existeUsuario = await pool.query('SELECT codigo FROM usuario WHERE codigo=?', [req.user.codigo]);
            if (existeUsuario.length < 1) {
                return res.json({ ok: false, mensaje: "Este usuario no existe" });
            }
            const verificarViatico = await pool.query('SELECT C.id FROM solicitud_comision as C INNER JOIN solicitud_viatico AS V ON C.id= V.id_solicitud_comision WHERE   V.status=6 AND C.id= ? ', [req.body.id_solicitud_comision]);
            if (verificarViatico.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede crear el informe, tu solicitud no esta completa" });
            }
            const existenciaInforme = await pool.query("SELECT * FROM informe_actividades WHERE id_solicitud_comision= ?", [verificarViatico[0].id]);
            if (existenciaInforme.length > 0) return res.json({ ok: false, mensaje: "Ya tienes un informe creado con esta solicitud" });
            const resp = await pool.query('INSERT INTO informe_actividades SET ?', [{
                id_usuario: req.user.codigo,
                id_solicitud_comision: verificarViatico[0].id,
                resultados: req.body.resultados,
                observaciones: req.body.observaciones,
                fecha_elaboracion: new Date(),
                status: req.body.status
            }]);
            let json = {
                "id_informe": resp.insertId
            };
            return res.json({ ok: true, mensaje: "Informe creado", body: json });


        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado', error });
        }
    },

    historialInforme: (req, res) => {
        try {
            pool.query(' SELECT inf.id as folio, inf.fecha_elaboracion, c.nombre_comision, concat(u.nombres , " " ,u.apellidos) as nombres FROM viaticos.informe_actividades AS inf INNER JOIN viaticos.solicitud_comision as c on c.id = inf.id_solicitud_comision  INNER JOIN viaticos.usuario as u on u.codigo = inf.id_usuario where inf.id_usuario =?', [req.user.codigo], (errorInforme, informes, fields) => {
                if (errorInforme) return res.json({ ok: false, mensaje: 'Error al obtener el informe' });
                if (informes.length < 1) return res.json({ ok: false, mensaje: "No tienes informes creados" });
                res.json({ ok: true, body: informes });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    },

    verInforme: (req, res) => {
        const { id } = req.params;
        try {
            pool.query('SELECT inf.id_solicitud_comision, inf.id, inf.fecha_elaboracion, inf.resultados, inf.observaciones, inf.fecha_aprobacion,inf.nombre_aprobacion,c.nombre_comision,c.objetivo_trabajo, concat(u.nombres , " " ,u.apellidos) as nombres , u.codigo FROM viaticos.informe_actividades AS inf INNER JOIN viaticos.solicitud_comision as c on c.id = inf.id_solicitud_comision INNER JOIN viaticos.usuario as u on u.codigo = inf.id_usuario where inf.id_solicitud_comision = ?', [id], (errorInforme, informe) => {
                if (errorInforme) return res.json({ ok: false, mensaje: errorInforme });
                if (informe.length < 1) return res.json({ ok: false, mensaje: "Este informe no existe" });
                pool.query('SELECT * FROM itinerario WHERE id_informe_actividades= ?', [informe[0].id], (errorItinerario, itinerario, fields) => {
                    if (errorItinerario) return res.json({ ok: false, mensaje: 'No existe el itinerario' });
                    pool.query('SELECT * FROM agenda WHERE id_informe_actividades= ?', [informe[0].id], (errorAgenda, agenda, fields) => {
                        if (errorAgenda) return res.json({ ok: false, mensaje: 'No existe la agenda' });
                        pool.query('SELECT * FROM factura WHERE id_informe_actividades= ?', [informe[0].id], (errorFactura, factura, fields) => {
                            if (errorFactura) return res.json({ ok: false, mensaje: 'No existen facturas' });
                            let json = {
                                folio: informe[0].id,
                                id_solicitud_comision: informe[0].id_solicitud_comision,
                                codigo: informe[0].codigo,
                                resultados: informe[0].resultados,
                                observaciones: informe[0].observaciones,
                                fecha_elaboracion: informe[0].fecha_elaboracion,
                                fecha_aprobacion: informe[0].fecha_aprobacion,
                                nombre_aprobacion: informe[0].nombre_aprobacion,
                                nombre_comision: informe[0].nombre_comision,
                                objetivo_trabajo: informe[0].objetivo_trabajo,
                                nombres: informe[0].nombres,
                                agenda: agenda,
                                itinerario: itinerario,
                                facturas: factura
                            }
                            return res.json({ ok: true, body: json });
                        });
                    });
                });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error Inesperado' });
        }
    },

    modificarInforme: async(req, res) => {
        //verificar que no este en status cancelado =-1, revision = 1, aceptado por F =3, aceptado por A= 5 o finalizado
        try {
            var sqlinforme = 'SELECT i.id, i.id_usuario, i.resultados, i.observaciones, i.fecha_elaboracion FROM informe_actividades AS i INNER JOIN usuario as u ON u.codigo = i.id_usuario INNER JOIN solicitud_comision as c ON c.id = i.id_solicitud_comision WHERE i.id = ? AND i.id_usuario = ? AND (i.status =0 OR i.status=2 OR i.status=4)'
            const verificarInforme = await pool.query(sqlinforme, [req.body.id, req.user.codigo]);
            if (verificarInforme.length < 1) {
                return res.json({ ok: false, mensaje: "No se puede modificar el informe" });
            }
            
            //si estatus =0 modificar fecha solicitud
            //si status = 2 no modificar fecha solicitud or status 4
            if (verificarInforme[0].status == 0)
                verificarInforme[0].fecha_elaboracion = new Date();
            pool.query('UPDATE informe_actividades SET ? WHERE id = ?', [{
                fecha_elaboracion: verificarInforme[0].fecha_elaboracion,
                resultados: req.body.resultados,
                observaciones: req.body.observaciones,
                status: req.body.status
            }, req.body.id], (errorModificar, modificarInforme) => {
                if (errorModificar) return res.json({ ok: false, mensaje: errorModificar });
                console.log(errorModificar);
                res.json({ ok: true, mensaje: "Informe modificado" });
            });
        } catch (error) {
            return res.json({ ok: false, mensaje: 'Error inesperado' });
        }
    }
}