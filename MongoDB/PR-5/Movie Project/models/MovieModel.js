const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    moviename: {
        type: String,
        required: true,
    },
    moviediscription: {
        type: String,
        required: true,
    },
    movieprice: {
        type: Number,
        required: true,
    },
    movieimage: {
        type: String,
        required: true,
    }
})

const movie= mongoose.model("movie", userSchema);
module.exports = movie;