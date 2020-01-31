const express = require('express');
const revisar_solicitud_comisionCtl = require('../controllers/revisar_solicitud_comision');

const router = express.Router();
const oauth = require('../middlewares/credentials');

router.get('/', oauth('J', 'A', 'S'),revisar_solicitud_comisionCtl.consultarSolicitudesViatico);
router.put('/', oauth('J', 'A'),revisar_solicitud_comisionCtl.modificarViatico);


// Rutas extras del controlador como archivos, etc.

module.exports = router;