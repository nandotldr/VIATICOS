const express = require('express');
const itinerarioCtl = require('../controllers/itinerario');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.crearItinerario);
router.get('/:id', oauth('P', 'J', 'A', 'S'), itinerarioCtl.selectItinerario);
router.put('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.modificarItinerario);
router.delete('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.eliminarItinerario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;