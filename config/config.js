const jwt = require('jsonwebtoken');
const express = require('express');

const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, "viaticos123*", (err, decoded) => {
            if (err) {
                return res.json('Error token invalido');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no invalido',

        });
    }

});

module.exports = {
    validador: rutasProtegidas,

    generador: (usuario) => {
        const payload = {
            check: true,
            "codigo": usuario[0].codigo,
            "tipo_usuario": usuario[0].tipo_usuario,
            "nombres": usuario[0].nombres
        };

        const token = jwt.sign(payload, "viaticos123*", {
            expiresIn: 1440
        });

        let json = {
            mensaje: 'Autenticación correcta',
            "codigo": usuario[0].codigo,
            "tipo_usuario": usuario[0].tipo_usuario,
            "nombres": usuario[0].nombres,
            token: token
        };

        return json;
    },
};