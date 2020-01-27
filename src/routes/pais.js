const express = require('express');
const paisesCtl = require('../controllers/paises');
var app = express();

const router = express.Router();

router.get('/', paisesCtl.selectContinentes);

module.exports = router;