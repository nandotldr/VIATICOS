const express = require('express');
const usuarioCtl = require('../controllers/usuario');

const router = express.Router();

router.post('/', usuarioCtl.crearUsuario);
router.put('/', usuarioCtl.modificarUsuario);
router.get('/:codigo', usuarioCtl.selectUsuario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;