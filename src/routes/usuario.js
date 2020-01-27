const express = require('express');
const cuentaCtl = require('../controllers/cuenta');

const router = express.Router();

const guard = require('../../config/config').validador;

router.post('/', cuentaCtl.crearCuenta);
router.put('/', cuentaCtl.modificarCuenta);
router.get('/:id', cuentaCtl.selectCuenta);

// Rutas extras del controlador como archivos, etc.

module.exports = router;