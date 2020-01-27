const express = require('express');
const programaTrabajoCtl = require('../controllers/programaTrabajo');

const router = express.Router();

router.post('/', programaTrabajoCtl.insert);
router.get('/', programaTrabajoCtl.selectAll);
router.get('/:id', programaTrabajoCtl.select);
router.put('/', programaTrabajoCtl.update);
router.delete('/', programaTrabajoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;