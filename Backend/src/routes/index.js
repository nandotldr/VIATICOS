const express = require('express');
const router = express.Router();

const auth = require('../middlewares/credentials');

router.get('/', auth(), (req, res) => {
    res.send('Viaticos API');
});


router.use('/factura', require('./factura'));
// router.use('/gasto', require('./gasto'));
// router.use('/historial_usuario', require('./historial_usuario'));
// router.use('/informe_actividades', require('./informe_actividades'));
router.use('/login', require('./login'));
// router.use('/municipio', require('./municipio'));
// router.use('/pais', require('./pais'));
// router.use('/programa_trabajo', require('./programa_trabajo'));
 router.use('/solicitud_comision', require('./solicitud_ comision'));
// router.use('/solicitud_viatico', require('./solicitud_viatico'));
router.use('/usuario', require('./usuario'));
// router.use('/viatico_proyecto', require('./viatico_proyecto'));




module.exports = router;