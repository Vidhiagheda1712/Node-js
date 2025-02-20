const express = require('express');

const port = 8010;

const app = express();
app.set('view engine', 'ejs');
let record = [];
app.use(express.urlencoded());

app.get('/table', (req, res) => {
    return res.render('table', {
        record
    });
})

app.get('/form', (req, res) => {
    return res.render('form')
})

app.post('/adduser', (req, res) => {
    const { username, useremail, userphone } = req.body;
    let obj = {
        id: Date.now(),
        name: username,
        email: useremail,
        phone: userphone
    }
    record.push(obj);
    console.log(`User Successfully Register...`);
    return res.redirect('/table');

})

app.get('/deleteuser', (req, res) => {
    let id = req.query.deleteId
    let deletedata = record.filter(val => val.id != id);
    record = deletedata;
    return res.redirect('/table');
})

app.get('/edituser', (req, res) => {
    let id = req.query.id;
    let single = record.find(val => val.id == id);
    return res.render('edit', {
        single
    });
})

app.post('/updateuser', (req, res) => {
    const { editid, username, useremail, userphone } = req.body;
    let up = record.map((val) => {
        if (val.id == editid) {
            val.name = username
            val.email = useremail
            val.phone = userphone
        }
        return val;
    })
    record = up;
    console.log(`Record Update Successfully....`);
    return res.redirect('/table');
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is Start on Port :-http://localhost:${port}`);

})


