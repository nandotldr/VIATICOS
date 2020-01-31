const express = require('express');
const validateCtl = require('../controllers/validate');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S', 'F'), validateCtl.validate);

// Rutas extras del controlador como archivos, etc.

module.exports = router;