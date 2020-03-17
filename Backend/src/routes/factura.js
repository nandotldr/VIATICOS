const express = require('express');
const facturaCtl = require('../controllers/factura');
const oauth = require('../middlewares/credentials');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), facturaCtl.crearfactura);
router.get('/:id', oauth('P', 'J', 'A', 'S', 'F'), facturaCtl.selectfactura);
router.put('/', oauth('P', 'J', 'A', 'S'), facturaCtl.modificarfactura);

// Rutas extras del controlador como archivos, etc.

router.post('/subir/factura', [oauth('P', 'J', 'A', 'S'), upload.single('archivo')], facturaCtl.subirFactura);

module.exports = router;