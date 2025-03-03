const http = require('http');

const port = 8010;
const server = http.createServer((req, res) => {
    res.write(`<h1>Hello World..</h1>`);
    res.write(`<h1>Har Har Mahadev...</h1>`);
    res.end();
});

server.listen(port, (err) => {
    if (!err) {
       console.log(`server is running on port ${port}` );
       
    }

})