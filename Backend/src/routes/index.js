const express = require('express');
const router = express.Router();

const auth = require('../middlewares/credentials');

router.get('/', auth(), (req, res) => {
    res.send('Viaticos API');
});


router.use('/factura', require('./factura'));
router.use('/gasto', require('./gasto'));
router.use('/informe_actividades', require('./informe_actividades'));
router.use('/login', require('./login'));
router.use('/municipio', require('./municipio'));
router.use('/pais', require('./pais'));
router.use('/programa_trabajo', require('./programa_trabajo'));
router.use('/solicitud_comision', require('./solicitud_ comision'));
router.use('/solicitud_viatico', require('./solicitud_viatico'));
router.use('/revisar_solicitud_comision', require('./revisar_solicitud_comision'));
router.use('/revisar_solicitud_viatico', require('./revisar_solicitud_viatico'));
router.use('/usuario', require('./usuario'));
router.use('/viatico_proyecto', require('./viatico_proyecto'));
router.use('/password_recovery', require('./password_recovery'));
router.use('/asignar_recursos', require('./asignar_recursos'));
router.use('/itinerario', require('./itinerario'));
router.use('/agenda', require('./agenda'));

module.exports = router;