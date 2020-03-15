const express = require('express');
const gastoCtl = require('../controllers/gasto');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), gastoCtl.insert);
//router.get('/', oauth('F'), gastoCtl.selectAll);
router.get('/:id', oauth('P', 'J', 'A', 'S'), gastoCtl.select);
router.get('/select/:id', oauth('P', 'J', 'A', 'S','F'), gastoCtl.selectOne);
router.put('/', oauth('P', 'J', 'A', 'S'), gastoCtl.update);
router.delete('/', oauth('P', 'J', 'A', 'S'), gastoCtl.delete);
router.patch('/aprobar',oauth('A', 'F'), gastoCtl.aceptarGasto);
router.patch('/rechazar',oauth('A', 'F'), gastoCtl.rechazarGasto);
router.get('/revisar/gasto', oauth('A', 'F'), gastoCtl.gastosPorRevisar);

// Rutas extras del controlador como archivos, etc.

module.exports = router;