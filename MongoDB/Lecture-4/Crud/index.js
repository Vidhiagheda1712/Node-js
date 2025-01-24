const express = require('express');

const port = 9000;
const app = express();
const db = require('./config/db');
const path = require('path');


app.set('view engine', 'ejs');

const UserModel = require('./models/UserModel');
const fs = require('fs');
app.use('/uplodes', express.static(path.join(__dirname, 'uplodes')));
app.use(express.urlencoded());

// file uplode start
const multer = require('multer');
const stg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uplodes')
    },
    filename: function (req, file, cb) {
        const unique = Math.floor(Math.random() * 10000000);
        cb(null, `${file.fieldname}-${unique}`);
    }
})

const imguplode = multer({ storage: stg }).single('image');
// file uplode end
app.get('/', (req, res) => {
    return res.render('form')
})


app.post('/adduser', imguplode, (req, res) => {
    const { name, email, password, gender, hobby, city, } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
        image: req.file?.path
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
    UserModel.findById(id)
        .then((singlerow) => {
            fs.unlinkSync(singlerow?.image)
        }).catch((err) => {
            console.log(err);
            return false;
        })


    UserModel.findByIdAndDelete(id)
        .then((data) => {
            console.log("Record Delete...");
            return res.redirect('/viewuser');

        }).catch((err) => {
            console.log(err);
            return false;
        })

});
app.get('/edituser', (req, res) => {
    let editid = req.query.eid;
    UserModel.findById(editid)
        .then((single) => {
            return res.render('edit', {
                single
            });
        }).catch((err) => {
            console.log(err);
            return false;

        })
})
app.post('/updateuser',imguplode, (req, res) => {
    const { editid, name, email, password, gender, hobby, city } = req.body;
    if (req.file) {
        //old image remove
        UserModel.findById(editid)
            .then((singlerow) => {
                fs.unlinkSync(singlerow?.image)
                UserModel.findByIdAndUpdate(editid, {
                    username: name,
                    useremail: email,
                    userpassword: password,
                    gender: gender,
                    hobby: hobby,
                    city: city,
                    image: req.file?.path
                }).then((user) => {
                    console.log(`user Update Successfully...`);
                    return res.redirect('/viewuser');

                }).catch((err) => {
                    console.log(err);
                    return false;

                })

            }).catch((err) => {
                console.log(err);
                return false;

            })

    } else {
        UserModel.findById(editid)
            .then((singlerow) => {
                UserModel.findByIdAndUpdate(editid, {
                    username: name,
                    useremail: email,
                    userpassword: password,
                    gender: gender,
                    hobby: hobby,
                    city: city,
                    image: singlerow?.image
                }).then((user) => {
                    console.log(`user Update Successfully...`);
                    return res.redirect('/viewuser');

                }).catch((err) => {
                    console.log(err);
                    return false;

                })
            })
    }
});
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Start on Port :- http://localhost:${port}`);
})