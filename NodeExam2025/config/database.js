const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/NodeExam2025`);
const db = mongoose.connection;
db.on("connected", (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`database is successfully connected`);
})
module.exports = db;

