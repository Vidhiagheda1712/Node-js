const express = require('express');
const routes = express.Router();

routes.use('/', require('./authRoute'));
routes.use('/category', require('./categoryRoute'));
routes.use('/subcategory', require('./subCategoryRoute'));
routes.use('/exsubcategory', require('./exsubCategoryRoute'));
module.exports = routes;