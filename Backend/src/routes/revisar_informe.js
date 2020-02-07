const express = require('express');
const revisar_informeCtl = require('../controllers/revisar_informe');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.get('/', auth('F', 'A'), revisar_informeCtl.consultarInformes);
router.put('/', auth('F', 'A'), revisar_informeCtl.aceptarInforme);
// Rutas extras del controlador como archivos, etc.

module.exports = router;