const express = require('express');

const port = 9020;
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use('/', require('./routes/indexRoute'));

const db = require('./config/db');

const path = require('path');

app.use(express.static(path.join(__dirname, 'config')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is Start on Port :- http://localhost:${port}`);

})