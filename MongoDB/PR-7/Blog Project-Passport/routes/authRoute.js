const express = require('express');

const routes = express.Router();
const passport = require('passport');
const {dashboardPage, loginUser,registerPage, loginPage, registerUser, logoutUser } = require('../controllers/authController');


routes.get('/', loginPage)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/register', registerPage)
routes.post('/registeruser', registerUser)
routes.get('/dash',  passport.checkUser, dashboardPage);
routes.get('/logoutuser', logoutUser);

module.exports = routes;