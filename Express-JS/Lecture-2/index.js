const express = require('express');

const port = 8080;

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('home');
});
app.get('/about', (req, res) => {
    return res.render('about');
});
app.get('/con', (req, res) => {
    return res.render('contact');
})

app.listen(port, (err) => {
    if (err) {
        console.log(`Page is Not Found...`);
        return false;
    }
    console.log(`Server is started on Port :- http://localhost:${port}`);
});
