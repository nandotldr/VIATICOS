const pool = require('../database');

module.exports = {
    selectMunicipio: (req, res) => {
        var sqlestados = 'SELECT estados.id as id, estados.nombre as estados, municipios.id as id , municipios.nombre as municipios, municipios.zona as zona FROM estados INNER JOIN municipios WHERE estados.id=municipios.estado_id';
        pool.query(sqlestados, (errorestados, estados, fields) => {
            if (errorestados) return res.json('Error al obtener los estados');


            const JSON_RESPONSE = { Estados: [] };
            const resultMySQLData = estados;
            resultMySQLData.forEach((item, i) => {

                /**
                 * @nota variables para utilizar para crear nuevo item en el array
                 */

                let estados = item.estados;
                let municipiosArray = [];

                /**
                 * @nota bandera para verificar que no insertemos dos Estados iguales
                 */
                let exist = false;

                /**
                 * @nota verificar que no el nuevo item a procesar sea nuevo
                 */
                JSON_RESPONSE.Estados.forEach(estadosItem => { if (estados === estadosItem.texto) exist = true });

                /**
                 * @nota si no existe el estados en el JSON entonces procesarlo
                 */

                if (!exist) {

                    resultMySQLData.forEach(municipios => {
                        if (municipios.estados === item.estados) {
                            municipiosArray.push({
                                texto: municipios.municipios,
                                valor: municipios.id_municipios,
                                activo: municipios.activo
                            });
                        }
                    });

                    /**
                     * @nota guardar el estados con sus municipioses
                     */

                    JSON_RESPONSE.Estados.push({ texto: estados, municipios: municipiosArray });
                }

            });
            res.json(JSON_RESPONSE);
            // }
            //}


        });
    }
}