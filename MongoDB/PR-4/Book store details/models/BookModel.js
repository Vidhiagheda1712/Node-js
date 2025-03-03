const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true,
    },
    bookdiscription: {
        type: String,
        required: true,
    },
    bookprice: {
        type: Number,
        required: true,
    },
    bookauthor: {
        type: String,
        required: true,
    }
})

const book= mongoose.model("book", userSchema);
module.exports = book;