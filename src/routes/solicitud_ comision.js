const express = require('express');
const solicitud_comisionCtl = require('../controllers/solicitud_comision');

const router = express.Router();

const guard = require('../../config/config').validador;

router.post('/', solicitud_comisionCtl.guardar_solicitud_comision);
router.get('/:id', solicitud_comisionCtl.select_solicitud_comision);
router.put('/', solicitud_comisionCtl.update);
router.delete('/', solicitud_comisionCtl.delete);


// Rutas extras del controlador como archivos, etc.

module.exports = router;