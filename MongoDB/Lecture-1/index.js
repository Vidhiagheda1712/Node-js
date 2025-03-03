const express = require('express');


const port = 9000;

const app = express();
const db = require('./config/db');

const path = require('path');

app.set('view engine', 'ejs');

app.use('/', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
    return res.render('index');
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }

    console.log(`Server is Start on Port : http://localhost:${port}`);

})