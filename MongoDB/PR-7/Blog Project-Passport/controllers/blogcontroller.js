const fs = require('fs');
const blogmodel = require('../models/blogModel');
const path = require('path');
const homePage = (req, res) => {
    return res.render('dashboard');
}
const addPage = (req, res) => {
    return res.render('addblog');
}
const readMore =(req,res)=>{
    return res.render('readmore')
}
// add blog data method start

const addData = async (req, res) => {
    try {
        const { name, description} = req.body;
        await blogmodel.create({
            blogname: name,
            blogdiscription: description,
            blogimage: req?.file?.path
        })
        console.log(`Blog Add Successfully...`);
        return res.redirect('/views');
    } catch (err) {
        console.log(err);
        return false;
    }
}
// add blog data method end

// view blog data method start
const viewPage = async (req, res) => {
    try {
        let record = await blogmodel.find({});
        return res.render('viewblog', {
            record
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
// deletedata method start
const deleteData = async (req, res) => {
    let id = req.query.did;
    const single = await blogmodel.findByIdAndDelete(id)
    try {
        fs.unlinkSync(single?.blogimage)
        console.log("Blog deleted..");
        return res.redirect('/views');
    } catch (err) {
        console.log(err)
        return false;
    }
}
// deletedata method end

//Read  data method start

const readData =async (req, res) => {
    try {
        let record = await blogmodel.find({});
        return res.render('readBlog', {
            record
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
//Read data method end

module.exports = {
    homePage,
    addPage,
    viewPage,
    addData,
    deleteData,
    readData,
   }


