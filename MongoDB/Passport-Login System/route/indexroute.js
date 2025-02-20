const express = require('express');

const route = express.Router();

route.use('/', require('./authroute'));
module.exports = route;