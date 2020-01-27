const express = require('express');
const municipiosCtl = require('../controllers/municipios');
var app = express();

const router = express.Router();

router.get('/', municipiosCtl.selectEstados);

module.exports = router;