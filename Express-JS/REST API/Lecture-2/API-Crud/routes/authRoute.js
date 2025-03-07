const express = require('express');
const routes = express.Router();
const { registerUser, loginUser, allUser } = require('../controller/authController');
const { varifyToken,authoriseRole} = require('../middleware/auth')
routes.post('/register', registerUser);
routes.post('/login', loginUser);
routes.get('/allusers', varifyToken, authoriseRole(['admin']), allUser);
module.exports = routes;