const express = require('express');
const destinoCtl = require('../controllers/ver_destino');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S', 'F'), destinoCtl.selectdestino);

// Rutas extras del controlador como archivos, etc.

module.exports = router;