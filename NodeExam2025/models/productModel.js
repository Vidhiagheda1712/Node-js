const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    productdiscription: {
        type: String,
        required: true,
    },
    productprice: {
        type: Number,
        required: true,
    },
    productqty: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }

})
const product = mongoose.model("product", productschema);

module.exports = product;


