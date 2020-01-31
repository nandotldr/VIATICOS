const express = require('express');
const asignar_recursosCtl = require('../controllers/asignar_recursos');

const router = express.Router();
const auth = require('../middlewares/credentials');

router.put('/', auth('F'), asignar_recursosCtl.update);


// Rutas extras del controlador como archivos, etc.

module.exports = router;