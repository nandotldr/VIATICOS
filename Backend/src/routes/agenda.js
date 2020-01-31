const express = require('express');
const agendaCtl = require('../controllers/agenda');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), agendaCtl.crearagenda);
router.get('/:id', oauth('P', 'J', 'A', 'S'), agendaCtl.selectagenda);
router.put('/', oauth('P', 'J', 'A', 'S'), agendaCtl.modificaragenda);
router.delete('/', oauth('P', 'J', 'A', 'S'), agendaCtl.eliminaragenda);

// Rutas extras del controlador como archivos, etc.

module.exports = router;