const CategoryModel =require('../models/categoryModel')
const SubCategoryModel = require('../models/subCategoryModel');
const addsubCategoryPage = async(req, res) => {
    try{
          let subcategory =await CategoryModel.find({status:'active'})
          return res.render('subcategory/add_subcategory',{
             category:subcategory
          })
    }
    catch (err) {
        console.log(err);
        return false;

    }


}
const insertsubCategory = async (req, res) => {
    try {
        const { category ,subcategory } = req.body;
        const sub = await SubCategoryModel.create({
            categoryId: category,
            subcategory:subcategory
        })
        req.flash('success', 'SubCategory Add Successfully...')
        return res.redirect('/category/addcategorypage');


    } catch (err) {
        console.log(err);
        return false;

    }
}
module.exports = { addsubCategoryPage ,insertsubCategory }