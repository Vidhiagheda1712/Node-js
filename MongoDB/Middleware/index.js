const express = require('express')

const port = 9000;
const app = express();
app.set('view engine', 'ejs');

const setAge = (req, res, next) => {
    let age = req.query.age;
    if (!age || age < 18){
        return res.redirect('/')
    }
    return next();
}
app.get('/', (req, res) => {
    return res.render('index')
})
app.get('/product',setAge, (req, res) => {
    return res.render('product')
})
app.get('/about',setAge, (req, res) => {
    return res.render('about')
})
app.use(setAge);
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is start on port :- ${port}`);

})