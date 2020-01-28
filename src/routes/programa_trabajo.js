const express = require('express');
const programa_trabajoCtl = require('../controllers/programa_trabajo');

const router = express.Router();

router.post('/', programa_trabajoCtl.insert);
router.get('/', programa_trabajoCtl.selectAll);
router.get('/:id', programa_trabajoCtl.select);
router.put('/', programa_trabajoCtl.update);
router.delete('/', programa_trabajoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;