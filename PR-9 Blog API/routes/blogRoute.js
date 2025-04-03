const express = require('express');

const route = express.Router();

const { createblog, viewblog, deleteBlog, updateBlog } = require('../controller/blogcontroller');

const { varifyToken, authoriseRole } = require('../middleware/auth');

const multer = require('multer');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 1000);
        cb(null, `${file.fieldname}-${uniq}`)
    }
})

const imageupload = multer({ storage: st }).single('image');

route.post('/addblog', varifyToken, authoriseRole(["admin"]), imageupload, createblog)

route.get('/viewblog', varifyToken, authoriseRole(["admin"]), viewblog);

route.delete('/deleteblog', deleteBlog);

route.put('/updateblog', varifyToken, imageupload, updateBlog)

module.exports = route