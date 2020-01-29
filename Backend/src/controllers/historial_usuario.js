const pool = require('../database');


module.exports = {

    selecthistorial: (req, res) => {
        const { id } = req.params;
        var sqlhistorial = "SELECT * FROM comision WHERE id_trabajador = ?";
        /* var sqlhistorial = 'SELECT comision.id_comision as folio, comision.fecha_creacion as fecha_creacion, estatus.tipo_estatus as estatus, programa_trabajo.lugar_estancia as destino, estatus.activo as activo FROM comision INNER JOIN programa_trabajo INNER JOIN estatus WHERE comision.id_comision=programa_trabajo.id_comision AND comision.idestatus=estatus.idestatus AND comision.id_trabajador = ?';*/
        pool.query(sqlhistorial, [id], (errorHistorial, historial, fields) => {
            if (errorHistorial) return res.json(errorHistorial);


            const JSON_RESPONSE = { Historial: [] };
            const resultMySQLData = historial;
            resultMySQLData.forEach((item, i) => {

                /**
                 * @nota variables para utilizar para crear nuevo item en el array
                 */

                let historial = item.historial;
                let comision = [];

                /**
                 * @nota bandera para verificar que no insertemos dos Estados iguales
                 */
                let exist = false;

                /**
                 * @nota verificar que no el nuevo item a procesar sea nuevo
                 */
                JSON_RESPONSE.Historial.forEach(historialItem => { if (historial === historialItem.texto) exist = true });

                /**
                 * @nota si no existe el estados en el JSON entonces procesarlo
                 */

                if (!exist) {

                    resultMySQLData.forEach(historial => {
                        if (comision.historial === item.historial) {
                            comision.push({
                                Folio: historial.folio,
                                Destino: historial.destino,
                                Fecha_de_creacion: historial.fecha_creacion,
                                Estatus: historial.estatus,
                                Activo: historial.activo
                            });
                        }
                    });

                    /**
                     * @nota guardar el estados con sus municipioses
                     */

                    JSON_RESPONSE.Historial.push({ Historial: historial, Comision: comision });
                }

            });
            res.json(historial);
            // }
            //}


        });
        // pool.query('SELECT id_comision, idestatus FROM comision WHERE id_trabajador = ?', [id], (errorHistorial, historial) => {
        //     if (errorHistorial) return res.json(errorHistorial);
        //     if (historial.lenght < 1) return res.json(historial);
        //     pool.query('SELECT lugar_estancia FROM programa_trabajo WHERE id_comision = ?', [historial[0].id_comision], (errorDestino, destino) => {
        //         if (errorDestino) return res.json(errorDestino);
        //         let json = {
        //             folio: historial[0].id_comision,
        //             destino: destino[0].lugar_estancia,
        //             estatus: historial[0].idestatus
        //         };
        //         return res.json(json);
        //     });
        // });
    }
}