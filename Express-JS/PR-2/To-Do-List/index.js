const express = require('express');

const port = 9090;

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
    const { usertask, userstatus, deadline } = req.body;
    let obj = {
        id: Date.now(),
        task: usertask,
        status: userstatus,
        deadline: deadline
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
    const { editid, usertask, userstatus, deadline } = req.body;
    let up = record.map((val) => {
        if (val.id == editid) {
            val.task = usertask,
            val.status = userstatus,
            val.deadline = deadline
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


