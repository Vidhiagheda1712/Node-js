const BlogModel = require('../models/blogModel');

const fs = require('fs');

const createblog = async (req, res) => {
    try {

        const { title, content } = req.body;

        const blog = await BlogModel.create({

            userId: req.user._id,
            title: title,
            content: content,
            image: req.file.path
        })
        return res.status(200).send({
            success: true,
            message: 'blog data success',
            blog
        })

    } catch (err) {
        return res.status(401).send({
            success: false,
            message: err
        })
    }
}
const viewblog = async (req, res) => {
    try {

        const blogs = await BlogModel.find({ userId: req.user?._id }).populate('userId');
        return res.status(200).send({
            success: true,
            message: 'blog data success',
            length: blogs.length,
            blogs
        })

    } catch (err) {
        return res.status(401).send({
            success: false,
            message: err
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.query?.id;
        const blogid = await BlogModel.findById(id);
        fs.unlinkSync(blogid?.image)
        const deleteuser = await BlogModel.findByIdAndDelete(id)

        return res.status(200).send({
            success: true,
            message: 'blog  successfully delete',
            deleteuser
        })

    } catch (err) {
        return res.status(401).send({
            success: false,
            message: err
        })
    }

}

const updateBlog = async (req, res) => {
    try {
        const { id, title, content } = req.body

        let ff = await BlogModel.findById(id);
        if (req.file) {
            try {
                fs.unlinkSync(ff?.image)
            } catch (err) {
                return res.status(401).send({
                    success: false,
                    message: err
                })
            }
            const update = await BlogModel.findByIdAndUpdate(id, {
                title: title,
                content: content,
                image: req?.file?.path
            })
            return res.status(200).send({
                success: true,
                message: 'blog  successfully update',
                update
            })
        }
        else {
            const update = await BlogModel.findByIdAndUpdate(id, {
                userId: req.user?._id,
                title: title,
                content: content,
                image: ff?.image
            })
            return res.status(200).send({
                success: true,
                message: 'blog  successfully update',
                update
                
            })

        }



    } catch (err) {
        return res.status(401).send({
            success: false,
            message: err
        })
    }

}


module.exports = {
    createblog, viewblog, deleteBlog, updateBlog
}