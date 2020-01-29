const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const pool = require('./database');


// inicializaciones
const app = express();

// Configuracion
app.set('port', process.env.port || 9000);

// Middelwares
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(jwt.());

// Rutas
app.use(require('./routes'));

// Archivos publicos y/o privados

// Iniciar servidor
app.listen(app.get('port'), () => console.log('Corriendo en puerto: ' + app.get('port')));