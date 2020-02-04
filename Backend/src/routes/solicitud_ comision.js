const express = require('express');
const solicitud_comisionCtl = require('../controllers/solicitud_comision');
const auth = require('../middlewares/credentials');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', auth('P', 'J', 'A', 'S'), solicitud_comisionCtl.crearSolicitudComision);
router.get('/:id', auth('P', 'J', 'A', 'S'), solicitud_comisionCtl.consultarSolicitudComison);
router.get('/', auth('P', 'J', 'A', 'S'), solicitud_comisionCtl.historialComisones);
router.put('/', auth('P', 'J', 'A', 'S'), solicitud_comisionCtl.modificarComision);


// Rutas extras del controlador como archivos, etc.
router.post('/subir/invitacion', [auth('P', 'J', 'A', 'S'), upload.single('archivo')], solicitud_comisionCtl.subirInvitacion);
router.post('/subir/programa', [auth('P', 'J', 'A', 'S'), upload.single('archivo')], solicitud_comisionCtl.subirPrograma);

module.exports = router;