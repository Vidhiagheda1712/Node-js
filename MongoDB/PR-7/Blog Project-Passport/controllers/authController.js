
const Users = require('../models/Model');
const registerPage = (req, res) => {
    return res.render('register');
}
const loginPage = (req, res) => {
    if (res.locals?.users) {
        return res.redirect('/dash')
    }
    return res.render('login');
}
const loginUser = async (req, res) => {

    return res.redirect('/dash');


}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await Users.create({
            username: name,
            useremail: email,
            userpassword: password
        })
        console.log(`user register successfully...!`);
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const dashboardPage = async (req, res) => {
    return res.render('dashboard');
}
const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;

        }
        res.redirect('/');
    })
}



module.exports = {
    registerPage, loginPage, loginUser, registerUser, dashboardPage, logoutUser

}