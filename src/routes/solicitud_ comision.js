const express = require('express');
const comisionCtl = require('../controllers/comision');

const router = express.Router();

const guard = require('../../config/config').validador;

router.post('/', comisionCtl.guardarComision);
router.get('/:id', comisionCtl.selectComision);
router.put('/', comisionCtl.update);
router.delete('/', comisionCtl.delete);


// Rutas extras del controlador como archivos, etc.

module.exports = router;