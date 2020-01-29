const express = require('express');
const municipioCtl = require('../controllers/municipio');
var app = express();

const router = express.Router();

router.get('/', municipioCtl.selectMunicipio);

module.exports = router;