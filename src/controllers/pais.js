const pool = require('../database');

module.exports = {
        selectPais: (req, res) => {
            var sqlContinente = 'SELECT continente.id_continente as id_continente,continente.nombre as continente, pais.id_pais as id_pais , pais.nombre as pais, pais.zona as zona, pais.activo as activo FROM continente INNER JOIN pais WHERE continente.id_continente=pais.id_continente';
            pool.query(sqlContinente, (errorContinente, continente, fields) => {
                if (errorContinente) return res.json(errorContinente);


                const JSON_RESPONSE = { continentes: [] };
                const resultMySQLData = continente;
                resultMySQLData.forEach((item, i) => {

                    /**
                     * @nota variables para utilizar para crear nuevo item en el array
                     */

                    let continente = item.continente;
                    let paises = [];

                    /**
                     * @nota bandera para verificar que no insertemos dos continentes iguales
                     */
                    let exist = false;

                    /**
                     * @nota verificar que no el nuevo item a procesar sea nuevo
                     */
                    JSON_RESPONSE.continentes.forEach(continenteItem => { if (continente === continenteItem.texto) exist = true });

                    /**
                     * @nota si no existe el continente en el JSON entonces procesarlo
                     */

                    if (!exist) {

                        resultMySQLData.forEach(pais => {
                            if (pais.continente === item.continente) {
                                paises.push({
                                    texto: pais.pais,
                                    valor: pais.id_pais,
                                    activo: pais.activo
                                });
                            }
                        });

                        /**
                         * @nota guardar el continente con sus paises
                         */

                        JSON_RESPONSE.continentes.push({ texto: continente, paises: paises });
                    }

                });
                res.json(JSON_RESPONSE);
                // }
                //}


            });
        }
    }
    //     var continentes = [];
    //
    //     // continente.forEach(element=>{
    //     //   console.log(element);
    //     //   console.log(element.continente);
    //     // continentes[element.id_pais]= {
    //     // continente:element.continente,
    //     // pais: element.id_pais,
    //     // };
    //     // });
    //     function groupBy(key, array) {
    //   var result = [];
    //   for (var i = 0; i < array.length; i++) {
    //     var added = false;
    //     for (var j = 0; j < result.length; j++) {
    //       if (result[j][key] == array[i][key]) {
    //         result[j].items.push(array[i]);
    //         added = true;
    //         break;
    //       }
    //     }
    //     if (!added) {
    //       var entry = {items: []};
    //       entry[key] = array[i][key];
    //       entry.items.push(array[i]);
    //       result.push(entry);
    //     }
    //   }
    //   return result;
    // }
    // var datos=groupBy('continente',continente);


//
//   pool.query('SELECT * FROM pais WHERE id_continente = ?',[continente.id_continente], (errorPais, pais, field) => {
//     if(errorPais) return res.json(errorPais);
//let resultJson = json(continente);

//for (var cont in continente){
// for (var cont2 = 0; cont2 < pais.lenght; cont2++){
//  let json =
//    {
//     continentes:[
//       {
//         id: continente[0].id_continente,
//         nombre: continente[0].nombre,
//         paises: [
//           {
//               id: pais[cont2].id_pais,
//               nombre: pais[cont2].nombre,
//               zona: pais[cont2].zona,
//               activo: pais[cont2].activo
//
//           }
//         ]
//       }
//     ]
//