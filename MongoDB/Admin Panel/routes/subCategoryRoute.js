const express = require('express');
const routes = express.Router();
 
const{addsubCategoryPage,insertsubCategory} = require('../controllers/subCategoryController')

routes.get('/addsubcategorypage', addsubCategoryPage);
routes.post('/insertsubcategory',insertsubCategory);




module.exports = routes;