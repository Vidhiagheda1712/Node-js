
const categoryModel = require('../models/categoryModel');

const addCategoryPage = (req, res) => {
    return res.render('category/add_Category')
}
const viewCategoryPage = async (req, res) => {
    try {
        let categories = await categoryModel.find({});
        return res.render('category/view_Category', {
            category: categories
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}

const insertCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const add = await categoryModel.create({
            category: category
        })
        req.flash('success', 'Category Add Successfully...')
        return res.redirect('/category/addcategorypage');


    } catch (err) {
        console.log(err);
        return false;

    }
}
const deleteCategory = async (req, res) => {
    try {
        let id = req.query?.id;
        await categoryModel.findByIdAndDelete(id);
        req.flash('success', 'Category Delete Successfully....');
        return res.redirect('/category');
    }
    catch (err) {
        console.log(err);
        return false;

    }

}
const editCategory = async (req, res) => {
    try {
        let id = req.query?.id;
        let single = await categoryModel.findById(id);
        return res.render('category/edit_Category', {
            single: single
        })

    }
    catch (err) {
        console.log(err);
        return false;

    }

}
const upadateCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        await categoryModel.findByIdAndUpdate(editid, {
            category: category
        })
        req.flash('success', "Category Update Successfully....");
        return res.redirect('/category');
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
            await categoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Category Status Update Successfully...");
            return res.redirect('/category');
        }
        else {
            await categoryModel.findByIdAndUpdate(id, {
                status: status
            })
            req.flash("success", "Category Status Update Successfully...");
            return res.redirect('/category');
        }

    }
    catch (err) {
        console.log(err);
        return false;

    }
}

module.exports = { addCategoryPage, viewCategoryPage, insertCategory, changeStatus, deleteCategory, editCategory, upadateCategory }