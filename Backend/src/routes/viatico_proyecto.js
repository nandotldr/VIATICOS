const express = require('express');
const viatico_proyectoCtl = require('../controllers/viatico_proyecto');
const auth = require('../middlewares/credentials');
const router = express.Router();

router.post('/', auth(), viatico_proyectoCtl.crearViaticoProyecto);
router.get('/:id', auth(), viatico_proyectoCtl.verViaticoProyecto);
router.put('/', viatico_proyectoCtl.modificarViaticoProyecto);
router.delete('/', auth(), viatico_proyectoCtl.eliminarProyecto);

router.post('/', viatico_proyectoCtl.insert);
router.get('/', viatico_proyectoCtl.selectAll);
router.get('/:id', viatico_proyectoCtl.select);
router.put('/', viatico_proyectoCtl.update);
router.delete('/', viatico_proyectoCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;
