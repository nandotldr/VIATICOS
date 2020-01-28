const express = require('express');
const viatico_proyectoCtl = require('../controllers/viatico_proyecto');

const router = express.Router();

router.post('/', viatico_proyectoCtl.insert);
router.get('/', viatico_proyectoCtl.selectAll);
router.get('/:id', viatico_proyectoCtl.select);
router.put('/', viatico_proyectoCtl.update);
router.delete('/', viatico_proyectoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;