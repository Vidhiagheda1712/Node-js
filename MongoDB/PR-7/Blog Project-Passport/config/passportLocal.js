const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const UserModel = require('../models/Model');

passport.use(new passportLocal({
    'usernameField': 'email'
}, async (email, password, done) => {
    try {
        console.log(email, password);
        let user = await UserModel.findOne({ useremail: email });
        if (!user || user.userpassword != password) {
            console.log(`Email and password not valid`);
            return done(null, false);

        }

        return done(null, user);
    }
    catch (err) {
        console.log(err);
        return done(null, err)

    }
}));
passport.serializeUser((user, done) => {
    return done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        let user = await UserModel.findById(id);
        return done(null, user);

    } catch (err) {
        console.log(err);
        return done(null, err);

    }
})

passport.checkUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}
passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.users = req.user;
    }
    return next();
}


module.exports = passport;