
const express = require('express');
const port = 9000;
const app = express();

app.set('view engine', 'ejs');
const path = require('path');
const db = require('./config/db');
const cookieparser = require('cookie-parser');
app.use(cookieparser());
app.use(express.urlencoded());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// login system - passport start 

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


app.use('/', express.static(path.join(__dirname, 'public')));
// flash massege start
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {
    res.locals.message = req.flash();
    return next();
})
// flash massege end 
app.use('/', require('./routes/indexRoute'))
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is Start on Port :-http://localhost/${port}`);

});