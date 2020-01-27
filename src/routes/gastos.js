const express = require('express');
const conceptoGastoCtl = require('../controllers/conceptoGasto');

const router = express.Router();

router.post('/', conceptoGastoCtl.insert);
router.get('/', conceptoGastoCtl.selectAll);
router.get('/:id', conceptoGastoCtl.select);
router.put('/', conceptoGastoCtl.update);
router.delete('/', conceptoGastoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;