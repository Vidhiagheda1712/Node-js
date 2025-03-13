const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subCategoryModel');
const addsubCategoryPage = async (req, res) => {
    try {
        let subcategory = await CategoryModel.find({ status: 'active' })
        return res.render('subcategory/add_subCategory', {
            category: subcategory
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }

}

const insertsubCategory = async (req, res) => {
    try {
        const { category, subcategory } = req.body;
        const sub = await SubCategoryModel.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', 'SubCategory Add Successfully...')
        return res.redirect('/subcategory/addsubcategorypage');


    } catch (err) {
        console.log(err);
        return false;

    }
}
const viewSubcategorypage = async (req, res) => {
    try {
        let subcategory = await SubCategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/view_subCategory', {
            subcategory: subcategory,

        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const editSubcategory = async (req, res) => {
    try {
        const id = req.query.id;
        let category = await CategoryModel.find({ status: 'active' });
        let single = await SubCategoryModel.findById(id).populate('categoryId');
        return res.render('subcategory/edit_subCategory', {
            single: single,
            category: category
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const upadatesubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory } = req.body;
        await SubCategoryModel.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategory: subcategory
        })
        req.flash('success', "SubCategory Update Successfully....");
        return res.redirect('/subcategory');
    }
    catch (err) {
        console.log(err);
        return false;

    }

}
const deletesubCategory = async (req, res) => {
    try {
        let id = req.query?.id;
        await SubCategoryModel.findByIdAndDelete(id);
        req.flash('success', 'SubCategory Delete Successfully....');
        return res.redirect('/subcategory');
    }
    catch (err) {
        console.log(err);
        return false;

    }

}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await SubCategoryModel.findByIdAndUpdate(id, {
                status: 'active'
            })
        }
        else {
            await SubCategoryModel.findByIdAndUpdate(id, {
                status: 'deactive'
            })

        }
        req.flash("success", "SubCategory Status Update Successfully...");
        return res.redirect('/subcategory');

    }
    catch (err) {
        console.log(err);
        return false;

    }
}

module.exports = { addsubCategoryPage, insertsubCategory, viewSubcategorypage, editSubcategory, upadatesubCategory, deletesubCategory, changeStatus }
