const express = require('express');
const controller = require('../jwt/jwtVerifiy');

const Jwtrouter = express.Router();

Jwtrouter.get('/api/check-token', controller.validateToken);

module.exports =Jwtrouter;
