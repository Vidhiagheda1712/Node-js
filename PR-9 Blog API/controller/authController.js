const UserModel = require('../models/UserModel');
const JWT = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(401).send({
                success: false,
                Message: "All Feild is Required"
            })
        }
        let user = await UserModel.create({
            username: name,
            useremail: email,
            userpassword: password
        })
        return res.status(200).send({
            success: true,
            message: "User Successfully Create",
            user
        })

    }
    catch (err) {
        return res.status(501).send({
            success: false,
            err: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                Message: "All Feild is Required"
            })
        }
        let user = await UserModel.findOne({ useremail: email });


        if (!password || user.userpassword != password) {
            return res.status(401).send({
                success: false,
                Message: "Email and Password is not Correct"
            })
        }
        const token = await JWT.sign({ user: user }, 'user', { expiresIn: '2hr' });
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token: token
        })
    }
    catch (err) {   
        return res.status(501).send({
            success: false,
            err: err
        })
    }
}
const allUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send({
            success: true,
            message: "User successfully Fetch",
            users: users

        })
    }
    catch (err) {
        return res.status(501).send({
            success: false,
            err: err
        })
    }
}
module.exports = {
    registerUser, loginUser, allUser
}