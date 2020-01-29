const express = require('express');
const historial_usuarioCt1 = require('../controllers/historial_usuario');
var app = express();

const router = express.Router();

router.get('/:id', historial_usuarioCt1.selecthistorial);

module.exports = router;