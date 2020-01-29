const express = require('express');
const gastoCtl = require('../controllers/gasto');

const router = express.Router();

router.post('/', gastoCtl.insert);
router.get('/', gastoCtl.selectAll);
router.get('/:id', gastoCtl.select);
router.put('/', gastoCtl.update);
router.delete('/', gastoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;