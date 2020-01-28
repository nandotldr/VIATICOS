const express = require('express');
const usuarioCtl = require('../controllers/usuario');

const router = express.Router();

const guard = require('../../config/config').validador;

router.post('/', usuarioCtl.crearusuario);
router.put('/', usuarioCtl.modificarusuario);
router.get('/:id', usuarioCtl.selectusuario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;