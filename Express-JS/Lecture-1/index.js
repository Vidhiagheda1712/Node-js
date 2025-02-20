const express = require(`express`);

const port = 9000;
const app = express();


app.get('/', (req, res) => {
    res.write(`<h1>Hello Vidhi...</h1>`);
    res.write(`<h1>How are u?</h1>`);
    res.end();
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;

    }
    console.log(`Server is Start On Port :- http://localhost:${port}`);

})