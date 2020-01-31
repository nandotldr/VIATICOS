const express = require('express');
const facturaCtl = require('../controllers/factura');

const auth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', auth(), facturaCtl.insert);
router.get('/', auth(), facturaCtl.selectAll);
router.get('/:id', auth(), facturaCtl.select);
router.put('/', auth(), facturaCtl.update);
router.delete('/', auth(), facturaCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;