const express = require('express');
const solicitud_comisionCtl = require('../controllers/solicitud_comision');
const auth = require('../middlewares/credentials');

const router = express.Router();

router.post('/',auth('P','J','A','S'),solicitud_comisionCtl.crearSolicitudComision);
router.get('/:id', auth('P','J','A','S'),solicitud_comisionCtl.consultarSolicitudComison);
router.get('/',solicitud_comisionCtl.historialComisones);
router.put('/', auth('P','J','A','S'),solicitud_comisionCtl.modificarComision);


// Rutas extras del controlador como archivos, etc.

module.exports = router;