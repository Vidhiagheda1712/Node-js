const CategoryModel = require('../models/categoryModel');
const SubCategoryModel = require('../models/subCategoryModel');
const exsubcategoryModel = require('../models/exsubcategoryModel');
const productModel = require('../models/productModel');
const exsubcategory = require('../models/exsubcategoryModel');
const subcategory = require('../models/subCategoryModel');

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
    const { category, subcategory, exsubcategory, name, price, quantity } = req.body;
  
    
    try {
        await productModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            productname: name,
            productprice: price,
            productqty: quantity,
            image:req.file?.path,
            
            
        })
        req.flash('success', 'Product successfully create');
        return res.redirect('/product/addproductpage')
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
        console.log(subcategory);

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
    addProductpage, viewProductpage, ajaxsubcategoryRecord, insertProduct,changeStatus
}