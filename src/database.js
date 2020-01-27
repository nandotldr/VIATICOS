const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

// Creando la conexion
const pool = mysql.createPool(database);

// Asignando y probando la conexion
pool.getConnection((error, conn) => {
    // Manejo de errores
    if(error) {
        if(error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONCEXIÓN A MYSQL FUE CERRADA!');
        }
        if(error.code === 'ER_CON_COUNT_ERROR') {
            console.error('MYSQL TIENE MUCHAS CONEXIONES!');
        }
        if(error.code === 'ECONNREFUSED') {
            console.error('LA CONEXIÓN FUE RECHAZADA!');
        }
    }
    // Asignar la conexion
    if(conn) {
        conn.release();
        console.log('Conexion a mysql correcta.');
    }
});

// Convertir observables en promesas
pool.query = promisify(pool.query);

module.exports = pool;
