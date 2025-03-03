const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    useremail: {
        type: String,
        required: true,
    },
    userpassword: {
        type: String,
        required: true,
    }

})
const user = mongoose.model("user", userschema);

module.exports = user;


