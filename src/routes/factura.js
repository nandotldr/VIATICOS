const express = require('express');
const facturasCtl = require('../controllers/facturas');

const router = express.Router();

router.post('/', facturasCtl.insert);
router.get('/', facturasCtl.selectAll);
router.get('/:id', facturasCtl.select);
router.put('/', facturasCtl.update);
router.delete('/', facturasCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;