const express = require('express');
const itinerarioCtl = require('../controllers/itinerario');
const oauth = require('../middlewares/credentials');

const router = express.Router();

router.post('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.crearitinerario);
router.get('/:id', oauth('P', 'J', 'A', 'S'), itinerarioCtl.selectitinerario);
router.put('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.modificaritinerario);
router.delete('/', oauth('P', 'J', 'A', 'S'), itinerarioCtl.eliminaritinerario);

// Rutas extras del controlador como archivos, etc.

module.exports = router;