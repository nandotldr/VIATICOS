const express = require('express');
const revisar_solicitud_viaticoCtl = require('../controllers/revisar_solicitud_viatico');

const router = express.Router();
const oauth = require('../middlewares/credentials');

router.get('/', oauth('J', 'A', 'S'),revisar_solicitud_viaticoCtl.consultarSolicitudesViatico);
router.put('/', oauth('J', 'A'),revisar_solicitud_viaticoCtl.modificarViatico);


// Rutas extras del controlador como archivos, etc.

module.exports = router;