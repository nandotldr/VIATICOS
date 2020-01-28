const express = require('express');
const usuarioCtl = require('../controllers/usuario');

const router = express.Router();

const guard = require('../../config/config').validador;

router.post('/', usuarioCtl.crearUsuario);
router.put('/', usuarioCtl.modificarUsuario);
router.get('/:id', usuarioCtl.selectUsuario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;