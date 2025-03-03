const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subCategoryModel');
const exsubcategoryModel = require('../models/exsubcategoryModel');


const addexsubCategoryPage = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'active' })
        let subcategories = await SubCategoryModel.find({ status: 'active' })
        return res.render('exsubcategory/add_exsubCategory', {
            category: category,
            subcategory: subcategories

        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
const insertexsubCategory = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory } = req.body;
        if (editid) {
            await exsubcategoryModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully update');
            return res.redirect('/exsubcategory')
        } else {
            await exsubcategoryModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategory: exsubcategory
            })
            req.flash('success', 'Exsubcategory successfully create');
            return res.redirect('/exsubcategory/addexsubcategorypage')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewexsubCategoryPage = async (req, res) => {
    try {
        let exsubcategory = await exsubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/view_exsubCategory', {
            exsubcategory: exsubcategory

        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const editexSubcategory = async (req, res) => {
    try {
        let id = req.query?.id;

        let category = await CategoryModel.find({ status: 'active' })
        let subcategory = await SubCategoryModel.find({ status: 'active' })

        let single = await exsubcategoryModel.findById(id).populate('categoryId').populate('subcategoryId')

        return res.render('exsubcategory/edit_exsubCategory', {
            single,
            category: category,
            subcategory: subcategory
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }

}

const ajaxCategoryWiseRecord = async (req, res) => {
    let categoryid = req.query?.categoryid;
    try {
        let category = await SubCategoryModel.find({ categoryId: categoryid }).populate('categoryId');


        let subcategory = await exsubcategoryModel.find({ categoryId: categoryid }).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: "Record Successfully Fetch",
            category: category,
            subcategory: subcategory
        })

    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const deleteExsubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        await exsubcategoryModel.findByIdAndDelete(id);
        req.flash('success', 'ExsubCategory Delete Successfully....');
        return res.redirect('/exsubcategory');

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
            await exsubcategoryModel.findByIdAndUpdate(id, {
                status: 'active'
            })
        }
        else {
            await exsubcategoryModel.findByIdAndUpdate(id, {
                status: 'deactive'
            })

        }

        req.flash("success", "ExSubCategory Status Update Successfully...");
        return res.redirect('/exsubcategory');
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

module.exports = { addexsubCategoryPage, viewexsubCategoryPage, ajaxCategoryWiseRecord, insertexsubCategory, editexSubcategory, deleteExsubcategory, changeStatus }