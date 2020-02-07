const express = require('express');
const revisar_solicitud_viaticoCtl = require('../controllers/revisar_solicitud_viatico');

const router = express.Router();
const oauth = require('../middlewares/credentials');

router.get('/', oauth('J', 'A', 'S'),revisar_solicitud_viaticoCtl.solicitudesViaticosPorRevisar);
router.put('/', oauth('F', 'A'),revisar_solicitud_viaticoCtl.aceptarViatico);


// Rutas extras del controlador como archivos, etc.

module.exports = router;