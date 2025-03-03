const express = require('express');
const routes = express.Router();
const { homePage, addPage, viewPage, addData, deleteData, readData } = require('../controllers/blogcontroller');



// multer start

const multer = require('multer');
const checkUserLogin = require('../middleware/checkUser');
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const unique = Math.floor(Math.random() * 100000000)
        cb(null, `${file.fieldname}-${unique}`)
    }
})
const imgupload = multer({ storage: st }).single('image')

// multer end
routes.post('/insert', imgupload, addData)
routes.get('/', homePage)
routes.get('/add', checkUserLogin, addPage)
routes.get('/views', viewPage)
routes.get('/deleteblog', deleteData)
routes.get('/editblog', readData)



module.exports = routes;