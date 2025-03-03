const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/db');

app.use(express.urlencoded());

app.set('view engine', 'ejs');

// login system start
const passport = require('passport');//1
const passportLocal = require('./config/passportlocal');//2
const session = require('express-session')//3


app.use(session({

    name: 'ee',
    secret: 'ss',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }

}));

app.use(passport.initialize());
app.use(passport.session());

// login system end

app.use('/', require('./route/indexroute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Start on port :${port}`)
});