const express = require('express');
const routes = express.Router();

const { addsubCategoryPage, insertsubCategory, viewSubcategorypage, editSubcategory } = require('../controllers/subCategoryController')

routes.get('/addsubcategorypage', addsubCategoryPage);
routes.get('/', viewSubcategorypage);
routes.post('/insertsubcategory', insertsubCategory);
routes.get('/editsubcategory', editSubcategory)
module.exports = routes;