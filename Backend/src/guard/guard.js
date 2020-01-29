const express = require('express');
const rutasProtegidas = express.Router();
const config = require('../../config/config');

const jwt = require('jsonwebtoken');

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, config, (err, decoded) => {
            if (err) {
                return res.json(token);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }

});


module.exports = rutasProtegidas;