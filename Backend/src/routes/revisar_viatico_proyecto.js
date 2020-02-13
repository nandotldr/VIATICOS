const express = require('express');
const revisar_viatico_proyectoCtl = require('../controllers/revisar_viatico_proyecto');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.get('/', auth('F', 'A'), revisar_viatico_proyectoCtl.consultarViaticoProyecto);
router.put('/', auth('F', 'A'), revisar_viatico_proyectoCtl.aceptarViaticoProyecto);
// Rutas extras del controlador como archivos, etc.

module.exports = router;