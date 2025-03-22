const express = require('express');

const routes = express.Router();

routes.use('/', require('./authRoute'));
routes.use('/', require('./productRoute'));


module.exports = routes;