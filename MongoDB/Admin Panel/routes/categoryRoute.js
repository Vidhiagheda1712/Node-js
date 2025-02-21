const express = require('express');


const routes = express.Router();
const { addCategoryPage, viewCategoryPage ,insertCategory ,changeStatus ,deleteCategory /*,editCategory */ } = require('../controllers/categoryController');

routes.get('/addcategorypage', addCategoryPage);
routes.get('/', viewCategoryPage);
routes.post('/insertcategory',insertCategory);
routes.get('/changestatus',changeStatus);
routes.get('/deletecategory',deleteCategory);
// routes.get('/editcategory',editCategory);

module.exports = routes;