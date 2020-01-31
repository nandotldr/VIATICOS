const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Crea un token
     * @param {string} code Codigo de trabajador
     * @param {string} userType Tipo de usuario. Cada usuario tiene permisos diferentes
     * @returns {string} Regresa un token
     */
    createToken: (code, userType) => {
        return jwt.sign(
            { codigo: code, tipo_usuario: userType },
            'viaticos123*',
            { expiresIn: '1d' });
    },
    /**
     * Revisa si el token es correcto.
     * @param {string} token Token con formato Bearer {{token}}
     * @returns {object} Token decifrado o null si es incorrectos o ha caducado
     */
    checkToken: async (token) => {
        // Get token
        try {
            let cleanToken = token.split(' ')[1];
            // let decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
            let decoded = jwt.verify(cleanToken, 'viaticos123*');
            return decoded;
        } catch (error) {
            return null;
        }
    },
};