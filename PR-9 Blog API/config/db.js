const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/Blog-API`);

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database successfully connected`);
})

module.exports = db;