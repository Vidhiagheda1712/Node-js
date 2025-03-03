const express = require('express');
const port = 9090;
const app = express();

app.set('view engine', 'ejs');

const path = require('path');
const db = require('./config/database');
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded());
const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use('/', require('./routes/indexRoute'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})