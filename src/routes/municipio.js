const express = require('express');
const municipioCtl = require('../controllers/municipio');
var app = express();

const router = express.Router();

router.get('/', municipioCtl.selectEstados);

module.exports = router;