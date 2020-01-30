const express = require('express');
const solicitud_comisionCtl = require('../controllers/solicitud_comision');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.post('/',solicitud_comisionCtl.crearSolicitudComision);
router.get('/:id', solicitud_comisionCtl.consultarSolicitudComison);
router.put('/', solicitud_comisionCtl.update);


// Rutas extras del controlador como archivos, etc.

module.exports = router;