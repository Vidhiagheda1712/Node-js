const express = require('express');
const multer = require('multer');
const routes = express.Router();
const { addProductpage, viewProductpage, ajaxsubcategoryRecord, insertProduct,changeStatus ,deleteProduct,editProduct,updateProduct} = require('../controllers/productController');

// multer start

const st = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null,'uploads');
    },
    filename : (req, file, cb) => {
        cb(null,`${file.fieldname}-${Math.floor(Math.random() * 1000000)}`);
    }
})
const imgupload = multer({storage : st}).single('image');

// multer end
routes.get('/addproductpage', addProductpage);
routes.get('/', viewProductpage);
routes.get('/ajaxcategoryrecord', ajaxsubcategoryRecord);
routes.post('/insertproduct',imgupload, insertProduct);
routes.get('/changestatus',changeStatus);
routes.get('/deleteproduct',deleteProduct);
routes.get('/editproduct',imgupload,editProduct);

module.exports = routes;