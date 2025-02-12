const mongoose = require('mongoose');
const blogschema = mongoose.Schema({
    blogname: {
        type: String,
        required: true,
    },
    blogdiscription: {
        type: String,
        required: true,
    },
    blogimage: {
        type: String,
        required: true,
    }

})
const blog = mongoose.model("blog", blogschema);

module.exports = blog;


