const express = require('express');
const solicitudViaticoCtl = require('../controllers/solicitudViatico');

const router = express.Router();

router.post('/', solicitudViaticoCtl.insert);
router.get('/', solicitudViaticoCtl.selectAll);
router.get('/:id', solicitudViaticoCtl.select);
router.put('/', solicitudViaticoCtl.update);
router.delete('/', solicitudViaticoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;