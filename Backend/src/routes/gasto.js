const express = require('express');
const gastoCtl = require('../controllers/gasto');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), gastoCtl.insert);
//router.get('/', oauth('F'), gastoCtl.selectAll);
router.get('/:id', oauth('P', 'J', 'A', 'S'), gastoCtl.select);
router.put('/', oauth('P', 'J', 'A', 'S'), gastoCtl.update);
router.delete('/', oauth('P', 'J', 'A', 'S'), gastoCtl.delete);
router.patch('/revisar',oauth('P', 'J', 'A', 'S'), gastoCtl.aceptarGasto);
router.get('/revisar/gasto', oauth('P', 'J', 'A', 'S'), gastoCtl.gastosPorRevisar);

// Rutas extras del controlador como archivos, etc.

module.exports = router;