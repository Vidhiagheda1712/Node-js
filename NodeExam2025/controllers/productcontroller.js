const fs = require("fs");
const productModel = require("../models/productModel");
const path = require("path");
const homePage = (req, res) => {
  return res.render("dashboard");
};
const addPage = (req, res) => {
  return res.render("addproduct");
};

// add product data method start

const addData = async (req, res) => {
  try {
    const { name, description, price, qty } = req.body;
    await productModel.create({
      productname: name,
      productdiscription: description,
      productprice: price,
      productqty: qty,
      image: req?.file?.path,
    });
    console.log(`product Add Successfully...`);
    return res.redirect("/views");
  } catch (err) {
    console.log(err);
    return false;
  }
};
// add product data method end

// view product data method start
const viewPage = async (req, res) => {
  try {
    let record = await productModel.find({});
    return res.render("viewproduct", {
      record,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};
// deletedata method start
const deleteData = async (req, res) => {
  let id = req.query.did;
  const single = await productModel.findByIdAndDelete(id);
  try {
    fs.unlinkSync(single?.image);
    console.log("product deleted..");
    return res.redirect("/views");
  } catch (err) {
    console.log(err);
    return false;
  }
};
// deletedata method end
//edit data method start

const editData = async (req, res) => {
  let id = req.query.eid;

  try {
    let single = await productModel.findById(id);
    console.log("Edit prduct Successfully");
    return res.render("updateproduct", {
      single,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

//edit data method end
// update product method start
const updateProduct = async (req, res) => {
  const { editid, name, description, price, qty} = req.body;
  let single = await productModel.findById(editid);
  fs.unlinkSync(single?.image);
  try {
    await productModel.findByIdAndUpdate(editid, {
      productname: name,
      productdiscription: description,
      productprice: price,
      productqty: qty,
      image: req?.file?.path,
    });
    console.log("product Update Successfully");
    return res.redirect("/views");
  } catch (err) {
    console.log(err);
    return false;
  }
};
// update product method end

module.exports = {
  homePage,
  addPage,
  viewPage,
  addData,
  deleteData,
  editData,
  updateProduct
};
