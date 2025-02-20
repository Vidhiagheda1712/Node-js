// create a server
const http = require('http');
const port = 8000;
const fs = require('fs');
const server = http.createServer((req, res) => {
    let fileName = "";
    switch (req.url) {
        case '/':
            fileName = './home.html'
            break;
        case '/about':
            fileName = './about.html'
            break;
        case '/blog':
            fileName = './blog.html'
            break;
        default: 
            fileName = './404.html' 
    }

    fs.readFile(fileName, (error, pageName) => {
        if (error) {
            console.log("File is Not Found....");
            return false;

        }
        res.end(pageName)
    })
})
server.listen(port, (error) => {
    console.log(`Server is running on port ${port}`);
});
