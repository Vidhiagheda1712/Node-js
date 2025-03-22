const express = require('express');
const routes = express.Router();
const { homePage, addPage, viewPage, addData, deleteData, editData, updateProduct ,cartProduct} = require('../controllers/productcontroller');

const passport = require('passport');

// multer start

const multer = require('multer');

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
routes.get('/add',passport.checkUser, addPage)
routes.get('/views',passport.checkUser, viewPage)
routes.get('/deleteproduct', deleteData);
routes.get('/editproduct', editData);
routes.get('/cartproduct', cartProduct);
routes.post('/update', imgupload, updateProduct);
module.exports = routes;