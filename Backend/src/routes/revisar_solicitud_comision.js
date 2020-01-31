const express = require('express');
const revisar_solicitud_comisionCtl = require('../controllers/revisar_solicitud_comision');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.get('/',revisar_solicitud_comisionCtl.consultarSolicitudesComison);
router.put('/', revisar_solicitud_comisionCtl.modificarComision);


// Rutas extras del controlador como archivos, etc.

module.exports = router;