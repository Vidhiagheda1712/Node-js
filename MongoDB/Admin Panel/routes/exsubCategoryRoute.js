const express = require('express');
const routes = express.Router();
const { addexsubCategoryPage ,viewexsubCategoryPage,ajaxCategoryWiseRecord ,insertexsubCategory ,editexSubcategory,deleteExsubcategory,changeStatus} = require('../controllers/exsubcategoryController');

routes.get('/addexsubcategorypage', addexsubCategoryPage);
routes.get('/', viewexsubCategoryPage);
routes.get('/ajaxcategoryrecord',ajaxCategoryWiseRecord);
routes.get('/editexsubcategory', editexSubcategory);
routes.post('/insertexsubcategory',insertexsubCategory);
routes.get('/deleteexsubcategory',deleteExsubcategory);
routes.get('/changestatus',changeStatus);
module.exports = routes;