const express = require('express');


const routes = express.Router();
const { addCrud, viewCrud, insertrec } = require('../controllers/crudController');
routes.get('/',viewCrud)
routes.get('/add',addCrud)

// MULTER START

const multer = require('multer');
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 1000000);
        cb(null, `${file.fieldname}-${uniq}`)
    }
})
const uploadfile = multer({ storage: st }).single('image');

// MULTER END

routes.post('/insertrec',uploadfile,insertrec)
module.exports = routes;