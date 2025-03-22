const express = require('express');
const port = 9090;
const app = express();

app.set('view engine', 'ejs');

const path = require('path');
const db = require('./config/database');
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded());


const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    name: 'rnw', 
    secret: 'rnw4',
    savaUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
// login system - passport  end 

app.use('/', require('./routes/indexRoute'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is start on port :- ${port}`);
})