const path = require('path');
const fs = require('fs');
const CategoryModel = require('../models/categoryModel');
const exsubcategoryModel = require('../models/exsubcategoryModel');
const productModel = require('../models/productModel');
const subCategoryModel = require('../models/subCategoryModel');



const addProductpage = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'active' });
        return res.render('product/add_product', {
            category: category,
        })

    }
    catch (err) {
        console.log(err);
        return false;

    }
}
const insertProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory, name, price, qty } = req.body;
        let single = await productModel.findById(editid);
        fs.unlinkSync(single?.image)
        if (editid) {
            await productModel.findByIdAndUpdate(editid, {
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                productname: name,
                productprice: price,
                productqty: qty,
                image:req?.file?.path
            })
            req.flash('success', 'Product successfully update');
            return res.redirect('/product')
        } else {
            await productModel.create({
                categoryId: category,
                subcategoryId: subcategory,
                exsubcategoryId: exsubcategory,
                productname: name,
                productprice: price,
                productqty: quantity,
                image: req?.file?.path


            })
            req.flash('success', 'Product successfully create');
            return res.redirect('/product/addproductpage')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }


}

const viewProductpage = async (req, res) => {
    try {
        let products = await productModel.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId');
        return res.render('product/view_product', {
            products: products
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
const ajaxsubcategoryRecord = async (req, res) => {

    try {
        let subcatid = req.query?.subcatid;
        let subcategory = await exsubcategoryModel.find({ subcategoryId: subcatid })

        return res.status(200).send({
            success: true,
            message: "Record Successfully Fetch",
            subcategory
        })



    }
    catch (err) {
        console.log(err);
        return false;

    }
}
// delete product start 
const deleteProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await productModel.findByIdAndDelete(id);
        fs.unlinkSync(single?.image)
        req.flash('success', 'Product Delete Successfully....');
        return res.redirect('/product');

    }
    catch (err) {
        console.log(err);
        return false;

    }
}
// delete product end 

// edit product start 
const editProduct = async (req, res) => {
    try {
        let id = req.query?.id;

        let category = await CategoryModel.find({ status: 'active' })
        let subcategory = await subCategoryModel.find({ status: 'active' })
        let exsubcategory = await exsubcategoryModel.find({ status: 'active' })

        let single = await productModel.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')

        return res.render('product/edit_product', {
            single,
            category: category,
            subcategory: subcategory,
            exsubcategory: exsubcategory
        })
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
// edit product end 


const changeStatus = async (req, res) => {

    try {
        const { id, status } = req.query;
        if (status == "deactive") {
            await productModel.findByIdAndUpdate(id, {
                status: 'active'
            })
        }
        else {
            await productModel.findByIdAndUpdate(id, {
                status: 'deactive'
            })

        }

        req.flash("success", " Product Status Update Successfully...");
        return res.redirect('/product');
    }
    catch (err) {
        console.log(err);
        return false;

    }
}
module.exports = {
    addProductpage, viewProductpage, ajaxsubcategoryRecord, insertProduct, changeStatus, deleteProduct, editProduct
}