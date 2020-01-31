const pool = require('../database');


module.exports = {

    selecthistorial: (req, res) => {
        const { codigo } = req.decoded.codigo;
        var sqlhistorial = "SELECT * FROM solicitud_comision WHERE id_usuario = ?";

        pool.query(sqlhistorial, [codigo], (errorHistorial, historial, fields) => {
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
                                Folio: historial.id,
                                Nombre: historial.nombre_comision,
                                Destino: historial.destino,
                                Fecha_solicitud: historial.fecha_solicitud,
                                Estatus: historial.status
                            });
                        }
                    });

                    /**
                     * @nota guardar el historial con sus comisiones
                     */

                    JSON_RESPONSE.Historial.push({ Historial: historial, Comision: comision });
                }

            });
            res.json({ ok: true, body: JSON_RESPONSE });
        });
    }
}