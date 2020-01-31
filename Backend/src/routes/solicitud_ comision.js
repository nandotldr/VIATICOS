const express = require('express');
const solicitud_comisionCtl = require('../controllers/solicitud_comision');
const auth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', auth('P', 'J', 'A', 'S'), solicitud_comisionCtl.crearSolicitudComision);
router.get('/:id', solicitud_comisionCtl.consultarSolicitudComison);
router.put('/', solicitud_comisionCtl.update);


// Rutas extras del controlador como archivos, etc.

module.exports = router;