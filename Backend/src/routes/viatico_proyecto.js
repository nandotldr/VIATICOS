const express = require('express');
const viatico_proyectoCtl = require('../controllers/viatico_proyecto');
const auth = require('../middlewares/credentials');
const router = express.Router();
const oauth = require('../middlewares/credentials');

router.post('/', oauth('P', 'J', 'A', 'S'), viatico_proyectoCtl.crearViaticoProyecto);
router.get('/:id', oauth('P', 'J', 'A', 'S', 'F'), viatico_proyectoCtl.verViaticoProyecto);
router.put('/', oauth('P', 'J', 'A', 'S', 'F'), viatico_proyectoCtl.modificarViaticoProyecto);
router.delete('/', oauth('P', 'J', 'A', 'S'), viatico_proyectoCtl.eliminarProyecto);


// Rutas extras del controlador como archivos, etc.

module.exports = router;