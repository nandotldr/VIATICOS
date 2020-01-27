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

    generador: (usuario, trabajador) => {
        const payload = {
            check: true
        };

        const token = jwt.sign(payload, "viaticos123*", {
            expiresIn: 1440
        });

        let json = {
            mensaje: 'Autenticación correcta',
            "id_trabajador": usuario[0].id_trabajador,
            "tipo": usuario[0].tipo_user,
            "nombre": trabajador[0].nombre,
            token: token
        };

        return json;
    },
};