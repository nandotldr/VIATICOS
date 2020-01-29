const express = require('express');
//const bcrypt = require('bcrypt');
// const cors = require('cors');
const loginCtl = require('../controllers/login');
var app = express();

const router = express.Router();

router.post('/', loginCtl.selectLogin);

// Rutas extras del controlador como archivos, etc.

module.exports = router;
// app.get('/comision', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for a Single Route'})
// });
//
//  app.listen(8080, function () {
//    console.log('CORS-enabled web server listening on port 8081')
// });
//
// var corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
//
// app.get('/comision', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for only example.com.'})
// })
//
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })