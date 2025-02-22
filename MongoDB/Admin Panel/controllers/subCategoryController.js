const SubCategoryModel = require('../models/subCategoryModel');

const addsubCategoryPage = (req, res) => {
    return res.render('subcategory/add_subCategory')

}
const insertsubCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const add = await SubCategoryModel.create({
            category: category
        })
        req.flash('success', 'Category Add Successfully...')
        return res.redirect('/category/addcategorypage');


    } catch (err) {
        console.log(err);
        return false;

    }
}
module.exports = { addsubCategoryPage ,insertsubCategory }