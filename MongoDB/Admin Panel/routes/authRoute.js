const express = require('express');
const passport = require('passport');

const routes = express.Router();
const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, forgotPage, forgotPassword, postOTP, getOtp, newPassword ,postNewPassword} = require('../controllers/authController');


routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.get('/dashboard', passport.checkUser, dashboardPage);
routes.post('/registeruser', registerUser);
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser);
routes.get('/logoutuser', logoutUser);
routes.get('/forgotpage', forgotPage); 
routes.post('/forgotpassword', forgotPassword);
routes.get('/otp', getOtp);
routes.post('/postotp', postOTP);
routes.get('/newpassword', newPassword);
routes.post('/postnewpassword', postNewPassword);


module.exports = routes;