const express = require('express');
const routes = express.Router();

const { addsubCategoryPage, insertsubCategory, viewSubcategorypage, editSubcategory, upadatesubCategory, deletesubCategory, changeStatus } = require('../controllers/subCategoryController');


routes.get('/addsubcategorypage', addsubCategoryPage);
routes.get('/', viewSubcategorypage);
routes.post('/insertsubcategory', insertsubCategory);
routes.get('/editsubcategory', editSubcategory);
routes.get('/changestatus', changeStatus);
routes.post('/updatesubcategory', upadatesubCategory);
routes.get('/deletesubcategory', deletesubCategory)
module.exports = routes;