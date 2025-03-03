
const Users = require('../models/Model');
const registerPage = (req, res) => {
    return res.render('register');
}
const loginPage = (req, res) => {
    if (req.cookies?.auth) {
        return res.redirect('/dash');
    }
    return res.render('login');
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Users.findOne({ useremail: email });
        if (!user || user.userpassword != password) {
            console.log(`Email and Password are not correct...!`);
            return res.redirect('/');

        }
        res.cookie('auth', user);
        return res.redirect('/dash');
    }
    catch (err) {
        console.log(err);
        return false;

    }

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
const logoutUser = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
}


module.exports = {
    registerPage, loginPage, loginUser, registerUser, dashboardPage, logoutUser
    
}