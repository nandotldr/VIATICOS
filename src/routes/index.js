const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Viaticos API');
});

router.use('/comision', require('./comision'));
router.use('/comisionLugar', require('./comisionLugar'));
router.use('/conceptoGasto', require('./conceptoGasto'));
router.use('/facturas', require('./facturas'));
router.use('/programaTrabajo', require('./programaTrabajo'));
router.use('/proyecto', require('./proyecto'));
router.use('/proyectoHasComision', require('./proyectoHasComision'));
router.use('/reporte', require('./reporte'));
router.use('/solicitudViatico', require('./solicitudViatico'));
router.use('/trabajador', require('./trabajador'));
router.use('/usuario', require('./usuario'));
router.use('/viatico', require('./viatico'));
router.use('/viaticoProyecto', require('./viaticoProyecto'));
router.use('/paises', require('./paises'));
router.use('/login', require('./login'));
router.use('/municipios', require('./municipios'));
router.use('/historialComision', require('./historialComision'));
router.use('/cuenta', require('./cuenta'));

module.exports = router;