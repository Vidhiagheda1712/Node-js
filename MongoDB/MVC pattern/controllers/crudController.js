const UserModel = require('../models/UserModel');
const addCrud = (req, res) => {
    return res.render('crud/add')
}
const viewCrud = async (req, res) => {
    try {
        let allrecord = await UserModel.find({});
        return res.render('crud/view', {
            record: allrecord
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const insertrec = async (req, res) => {
    try {
        const { name, email, password, gender, hobby, city } = req.body;
        await UserModel.create({
            username: name,
            useremail: email,
            userpassword: password,
            gender: gender,
            hobby: hobby,
            city: city,
            image: req?.file?.path
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
module.exports = {
    addCrud, viewCrud, insertrec
}