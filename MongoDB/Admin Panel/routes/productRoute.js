const express = require('express');
const routes = express.Router();
const { addProductpage, viewProductpage, ajaxsubcategoryRecord, insertProduct,changeStatus } = require('../controllers/productController');
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
routes.get('/addproductpage', addProductpage);
routes.get('/', viewProductpage);
routes.get('/ajaxcategoryrecord', ajaxsubcategoryRecord);
routes.post('/insertproduct',imgupload, insertProduct);
routes.get('/changestatus',changeStatus);
module.exports = routes;