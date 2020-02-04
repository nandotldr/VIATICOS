const express = require('express');
const agendaCtl = require('../controllers/agenda');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), agendaCtl.crearAgenda);
router.get('/:id', oauth('P', 'J', 'A', 'S'), agendaCtl.selectAgenda);
router.put('/', oauth('P', 'J', 'A', 'S'), agendaCtl.modificarAgenda);
router.delete('/', oauth('P', 'J', 'A', 'S'), agendaCtl.eliminarAgenda);

// Rutas extras del controlador como archivos, etc.

module.exports = router;