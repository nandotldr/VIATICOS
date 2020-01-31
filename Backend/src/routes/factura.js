const express = require('express');
const facturaCtl = require('../controllers/factura');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), facturaCtl.crearfactura);
router.get('/', oauth('P', 'J', 'A', 'S', 'F'), facturaCtl.selectfactura);
router.put('/', oauth('P', 'J', 'A', 'S'), facturaCtl.modificarfactura);

// Rutas extras del controlador como archivos, etc.

module.exports = router;