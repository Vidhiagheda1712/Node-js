const express = require('express');

const port = 9000;
const app = express();
const db = require('./config/db');
const path = require('path');


app.set('view engine', 'ejs');

const UserModel = require('./models/UserModel')
app.use(express.urlencoded());
app.get('/', (req, res) => {
    return res.render('form')
})


app.post('/adduser', (req, res) => {
    const { name, email, password, gender, hobby, city } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
    }).then((record) => {
        console.log("Record Create Successfully....");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;

    })
})

app.get('/viewuser', (req, res) => {
    UserModel.find({})
        .then((record) => {
            return res.render('table', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
})
app.get('/deleteuser', (req, res) => {
    let id = req.query.did;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log("Record Delete...");
            return res.redirect('/viewuser');

        }).catch((err) => {
            console.log(err);
            return false;
        })

})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Start on Port :- http://localhost:${port}`);
})