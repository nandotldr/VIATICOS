const express = require('express');
const reporteCtl = require('../controllers/reporte');

const router = express.Router();

router.post('/', reporteCtl.insert);
router.get('/', reporteCtl.selectAll);
router.get('/:id', reporteCtl.select);
router.put('/', reporteCtl.update);
router.delete('/', reporteCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;