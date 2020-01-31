const express = require('express');
const loginCtl = require('../controllers/login');
var app = express();

const router = express.Router();

router.post('/', loginCtl.selectLogin);

module.exports = router;