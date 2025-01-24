const express = require('express');

const port = 9090;
const app = express();
const db = require('./config/db');
const path = require('path');
app.set('view engine', 'ejs');
const BookModel = require('./models/BookModel');
app.use(express.urlencoded());
app.get('/', (req, res) => {
    return res.render('addbook');
})
app.post('/addbook', (req, res) => {
    const { name, description, price, author } = req.body;
    BookModel.create({
        bookname: name,
        bookdiscription: description,
        bookprice: price,
        bookauthor: author
    }).then((record) => {
        console.log("Book Add Successfully...");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
      
        return false;
    })
})
app.get('/viewbook', (req, res) => {
    BookModel.find({})
        .then((record) => {
            return res.render('viewbook', {
                allrecord: record
            })
        }).catch((err) => {
            console.log(err);
            return false;
        })
});


app.get('/deletebook', (req, res) => {
    let deleteUId = req.query.did;
    BookModel.findByIdAndDelete(deleteUId)
        .then((data) => {
            console.log(`Record Delete Successfully....`);
            return res.redirect('viewbook');
        }).catch((err) => {
            console.log(err);
            return false;

        })
})
app.get('/editbook', (req, res) => {
    let editId = req.query.eid;
    BookModel.findById(editId)
        .then((single) => {
            return res.render('updatebook', {
                single
            });
        }).catch((err) => {
            console.log(err);
            return false;

        })
})

app.post('/updatebook', (req, res) => {
    const { editid, name, description, price, author } = req.body;
    BookModel.findByIdAndUpdate(editid, {
        bookname: name,
        bookdiscription: description,
        bookprice: price,
        bookauthor: author
    }).then((upbook) => {
        console.log(`Book Update Successfully...`);
        return res.redirect('/viewbook');

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
    console.log(`Server is start on port :-http://localhost:${port}`);
});
