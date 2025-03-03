
const UserModel = require('../models/UserModel');
const nodemailer = require('nodemailer')
const loginPage = (req, res) => {
    if (res.locals?.users) {
        return res.redirect('/dashboard')
    }
    return res.render('login')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const dashboardPage = (req, res) => {
    return res.render('dashboard')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await UserModel.create({
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
const loginUser = (req, res) => {
    try {
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const forgotPage = (req, res) => {
    return res.render('forgotPage')
}

const forgotPassword = async (req, res) => {
    try {
        const { useremail } = req.body;
        let user = await UserModel.findOne({ useremail: useremail });
        console.log(user);

        if (!user) {
            console.log(`Email is not match with Previous Email`);
            return res.redirect('/forgotpage')

        }
        else {
            let otp = Math.floor(Math.random() * 100000)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aghedavidhi1712@gmail.com',
                    pass: 'rasr lpgn uldu qqex'
                }
            });

            var mailOptions = {
                from: 'aghedavidhi1712@gmail.com',
                to: useremail,
                subject: 'Forgot Password',
                html: `<h1 style="color:green"> Your OTP :- ${otp}</h1>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    let userotp = {
                        otp: otp,
                        email: useremail
                    }
                    res.cookie('userotp', userotp)
                    console.log('Email sent: ' + info.response);
                    return res.redirect('/otp')
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const getOtp = (req, res) => {
    return res.render('otp')
}
const postOTP = (req, res) => {
    let otp = req.body.otp;
    let userotp = req.cookies.userotp?.otp;
    if (otp == userotp) {
        return res.redirect('/newpassword')
    }
    else {
        console.log(`OTP is not match....`);
        return res.redirect('/otp')

    }
}
const newPassword = (req, res) => {
    return res.render('newpassword')
}
const postNewPassword = async (req, res) => {
    try {
        const { newpassword, cpassword } = req.body;
        if (newpassword == cpassword) {
            let useremail = req.cookies.userotp?.email;
            await UserModel.findOneAndUpdate({ useremail: useremail }, {
                userpassword: newpassword
            })
            res.clearCookie('userotp');
            return res.redirect('/');
        }
        else {
            console.log(`NewPassword and ConfirmPassword are not Match....!`);
            return res.redirect('/newpassword')
        }
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;

        }
        console.log(`logout successfully `);
        return res.redirect('/');
    })



}
module.exports = {
    loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, forgotPage, forgotPassword, getOtp, postOTP, newPassword, postNewPassword
}
