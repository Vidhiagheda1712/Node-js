const fs = require('fs');
const MovieModel = require('../models/MovieModel');
const path = require('path');
const homePage = (req, res) => {
    return res.render('home');
}
const addPage = (req, res) => {
    return res.render('add');
}
// add Movie data method start

const addData = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await MovieModel.create({
            moviename: name,
            moviediscription: description,
            movieprice: price,
            movieimage: req?.file?.path
        })
        console.log(`Movie Add Successfully...`);
        return res.redirect('/views');
    } catch (err) {
        console.log(err);
        return false;
    }
}
// add Movie data method end

// view Movie data method start
const viewPage = async (req, res) => {
    try {
        let record = await MovieModel.find({});
        return res.render('view', {
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
    const single = await MovieModel.findByIdAndDelete(id)
    try {
        fs.unlinkSync(single?.movieimage)
        console.log("Movie deleted..");
        return res.redirect('/views');
    } catch (err) {
        console.log(err)
        return false;
    }
}
// deletedata method end

//edit data method start

const editData = async (req, res) => {
    let id = req.query.eid;

    try {
        let single = await MovieModel.findById(id);
        console.log('Edit Movie Successfully')
        return res.render('edit', {
            single
        });
    } catch (err) {
        console.log(err)
        return false;
    }
}

//edit data method end
// update movie method start
const updateMovie = async (req, res) => {
    const { editid, name, description, price} = req.body;
    let single = await MovieModel.findById(editid);
    fs.unlinkSync(single?.movieimage)
        try {
        await MovieModel.findByIdAndUpdate(editid, {
            moviename: name,
            moviediscription: description,
            movieprice: price,
            movieimage:req?.file?.path
         });
        console.log('Movie Update Successfully');
        return res.redirect('/views');
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
// update movie method end
module.exports = {
    homePage,
    addPage,
    viewPage,
    addData,
    deleteData,
    editData,
    updateMovie

}


