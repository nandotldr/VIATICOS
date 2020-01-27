const express = require('express');
const historialComisionCt1 = require('../controllers/historialComision');
var app = express();

const router = express.Router();

router.get('/:id', historialComisionCt1.selecthistorial);

module.exports = router;