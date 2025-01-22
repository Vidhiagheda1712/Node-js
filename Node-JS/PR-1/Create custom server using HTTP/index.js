const http = require('http');

const port = 8000;
const fs = require('fs');

const server = http.createServer((req, res) => {
    let fileName = "";
    switch (req.url) {
        case '/home':
            fileName = './Home.html'
            break;
        case '/about':
            fileName = './About.html'
            break;
        case '/blog':
            fileName = './Blog.html'
            break;
        case '/contact':
            fileName = './Contact.html'
            break;
        case '/news':
            fileName = './News.html'
            break;
        case '/shop':
            fileName = './Shop.html'
            break;
        case '/services':
            fileName = './Services.html'
            break;
        case '/works':
            fileName = './Works.html'
            break;
        case '/faq':
            fileName = './FAQ.html'
            break;
        case '/pages':
            fileName = './Pages.html'
            break;
        default:
            fileName = './404.html'

    }

    fs.readFile(fileName, (err, pageName) => {
        if (err) {
            console.log("File is Not Found....");
            return false;

        }
        res.end(pageName)
    })
})
server.listen(port, (err) => {
   if(!err){
    console.log(`Server is running on port :- http://localhost: ${port}`);
   }
});
