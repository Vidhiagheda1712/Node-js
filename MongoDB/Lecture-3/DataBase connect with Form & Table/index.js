const express = require('express');
const port = 8080;

const app = express();
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    return res.render('form');
})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Start on Port :- http://localhost:${port}`);

})
