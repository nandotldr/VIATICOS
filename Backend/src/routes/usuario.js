const express = require('express');
const usuarioCtl = require('../controllers/usuario');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.post('/', usuarioCtl.crearUsuario);
router.put('/', auth('P', 'J', 'A', 'S'), usuarioCtl.modificarUsuario);
router.get('/', auth('P', 'J', 'A', 'S'), usuarioCtl.selectUsuario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;