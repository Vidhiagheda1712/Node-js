const express = require('express');

const routes = express.Router();


const { registerpage, loginpage, registerUser, loginUser, aboutpage, dashboardpage, logoutUser } = require('../controller/Authcontroller')

const passport = require('passport');

routes.get('/register', registerpage);
routes.get('/', loginpage);
routes.get('/about', passport.checkUser, aboutpage);
routes.get('/dashboard', passport.checkUser, dashboardpage);
routes.post('/registeruser', registerUser);
routes.get('/logoutuser', logoutUser);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser);

module.exports = routes;