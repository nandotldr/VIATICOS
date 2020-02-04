const express = require('express');
const programa_trabajoCtl = require('../controllers/programa_trabajo');
const auth = require('../middlewares/credentials');
const router = express.Router();

router.post('/', auth('P','J','A','S'),programa_trabajoCtl.crearPrograma);
router.get('/:id',auth('P','J','A','S'), programa_trabajoCtl.verPrograma);
router.put('/', auth('P','J','A','S'),programa_trabajoCtl.modificarPrograma);
router.delete('/',auth('P','J','A','S'), programa_trabajoCtl.eliminarPrograma);



// Rutas extras del controlador como archivos, etc.

module.exports = router;
