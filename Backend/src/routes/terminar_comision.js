const express = require('express');
const terminar_comisionCtl = require('../controllers/terminar_comision');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.put('/', oauth('F'), terminar_comisionCtl.terminar_comision);

// Rutas extras del controlador como archivos, etc.

module.exports = router;