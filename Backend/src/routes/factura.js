const express = require('express');
const facturaCtl = require('../controllers/factura');

const router = express.Router();

router.post('/', facturaCtl.insert);
router.get('/', facturaCtl.selectAll);
router.get('/:id', facturaCtl.select);
router.put('/', facturaCtl.update);
router.delete('/', facturaCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;