const jwt = require('../services/jwt');
/**
 * Middelware que revisa el token para ver si tiene
 * las credenciales correctas
 * @param {string[]} args Uno o mas tipos de credenciales
 */
module.exports = (...args) => {
    return async (req, res, next) => {
            let decoded = await jwt.checkToken(req.get('access-token'));
            // Token no es valido o ha expirado
            if(!decoded) {
                return res.json({
                    ok: false,
                    message: 'Sesión invalida.'
                });
            }
            // Si no tiene args regresa correcto
            if(args.length === 0) {
                return next();
            }
            // Ver si tiene las credenciales correctas
            let tieneCredencialesCorrectas = false;
            args.forEach(item => {
                if(item == decoded.tipo_usuario) {
                    tieneCredencialesCorrectas = true;
                }
            });
            if(tieneCredencialesCorrectas) {
                req.user = decoded;
                next();
            } else {
                return res.json({
                    ok: false,
                    message: 'No tienes los permisos necesarios.'
                });
            }
    }
}