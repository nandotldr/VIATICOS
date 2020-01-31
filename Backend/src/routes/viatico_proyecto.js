const express = require('express');
const viatico_proyectoCtl = require('../controllers/viatico_proyecto');
const auth = require('../middlewares/credentials');
const router = express.Router();

router.post('/', viatico_proyectoCtl.crearViaticoProyecto);
router.get('/:id', viatico_proyectoCtl.verViaticoProyecto);
router.put('/', viatico_proyectoCtl.modificarViaticoProyecto);
router.delete('/', viatico_proyectoCtl.eliminarProyecto);


// Rutas extras del controlador como archivos, etc.

module.exports = router;
