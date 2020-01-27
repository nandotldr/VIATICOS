const express = require('express');
const gastosCtl = require('../controllers/gastos');

const router = express.Router();

router.post('/', gastosCtl.insert);
router.get('/', gastosCtl.selectAll);
router.get('/:id', gastosCtl.select);
router.put('/', gastosCtl.update);
router.delete('/', gastosCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;