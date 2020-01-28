const express = require('express');
const informe_actividadesCtl = require('../controllers/informe_actividades');

const router = express.Router();

router.post('/', informe_actividadesCtl.insert);
router.get('/', informe_actividadesCtl.selectAll);
router.get('/:id', informe_actividadesCtl.select);
router.put('/', informe_actividadesCtl.update);
router.delete('/', informe_actividadesCtl.delete);

// Rutas extras del controlador como archivos, etc.

module.exports = router;