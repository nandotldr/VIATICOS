const express = require('express');
const programa_trabajoCtl = require('../controllers/programa_trabajo');
const auth = require('../middlewares/credentials');
const router = express.Router();

router.post('/', auth(), programa_trabajoCtl.crearPrograma);
router.get('/:id', auth(), programa_trabajoCtl.verPrograma);
router.put('/', programa_trabajoCtl.modificarPrograma);
router.delete('/', auth(), programa_trabajoCtl.eliminarPrograma);



// Rutas extras del controlador como archivos, etc.

module.exports = router;
