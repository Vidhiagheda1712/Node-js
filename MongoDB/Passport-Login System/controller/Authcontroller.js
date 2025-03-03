const UserModel = require('../models/UserModel')

const registerpage = (req, res) => {
    return res.render('register');
}
const loginpage = (req, res) => {

    return res.render('login');
}
const dashboardpage = (req, res) => {
    return res.render('dashboard');
}

const aboutpage = (req, res) => {
    return res.render('about');
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log('user register');
        return res.redirect('/')

    } catch (err) {
        console.log(err);
        return false;
    }
}

const loginUser = (req, res) => {
    try {
        console.log("done");

        return res.redirect('/dashboard');

    } catch (error) {
        console.log(err);
        return false;
    }
}
const logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}

module.exports = {
    registerpage, loginpage, registerUser, loginUser, aboutpage, dashboardpage, logoutUser
}