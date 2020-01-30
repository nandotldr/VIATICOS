const express = require('express');
const gastoCtl = require('../controllers/gasto');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', gastoCtl.insert);
router.get('/', oauth('F'), gastoCtl.selectAll);
router.get('/:id', gastoCtl.select);
router.put('/', gastoCtl.update);
router.delete('/', gastoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;