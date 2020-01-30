const express = require('express');
const password_recoveryCtl = require('../controllers/password_recovery');

const router = express.Router();

router.put('/', password_recoveryCtl.update);


// Rutas extras del controlador como archivos, etc.

module.exports = router;