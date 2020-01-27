const express = require('express');
const proyectoCtl = require('../controllers/proyecto');

const router = express.Router();

router.post('/', proyectoCtl.insert);
router.get('/', proyectoCtl.selectAll);
router.get('/:id', proyectoCtl.select);
router.put('/', proyectoCtl.update);
router.delete('/', proyectoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;