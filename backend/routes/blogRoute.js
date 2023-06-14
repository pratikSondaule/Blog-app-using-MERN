const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");

const router = express.Router();

// Get all blogs
router.get("/all-blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().populate("user");
        if (!blogs) {
            return res.status(200).send({ message: "No blogs found" })
        }

        return res.status(200).send({
            message: "All blogs lists",
            blogCount: blogs.length,
            blogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while getting all blogs" })
    }
})

// Create a blog
router.post("/create-blog", async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        if (!title || !description || !image || !user) {
            return res.status(400).send({ message: "Please provide all fields" });
        }

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).send({ message: "Unable to find user" });
        }

        const session = await mongoose.startSession();

        await session.withTransaction(async () => {
            const newBlog = new Blog({
                title,
                description,
                image,
                user
            });
            await newBlog.save();
            existingUser.blogs.push(newBlog);
            await existingUser.save();
            res.status(201).send({ message: "Blog created successfully", newBlog });
        });

        session.endSession();

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while creating blog" });
    }
});


// Get single blog by id
router.get("/get-blog/:id", async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.status(404).send({ message: "Blog not found with this id" })
        }

        return res.status(200).send({ message: "Blog fetched", blog })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while getting single blog" })
    }
})

// Update a blog
router.put("/update-blog/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body

        const blog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({ message: "Blog updated successfully", blog })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while updating blog" })
    }
})

// Delete a blog
router.delete("/delete-blog/:id", async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            message: "Blog deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while deleting blog" })
    }
});

// User blogs
router.get("/user-blog/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userBlog = await User.findById(id).populate("blogs")

        if (!userBlog) {
            return res.status(404).send({ message: "Blog not found with this id" })
        }

        return res.status(200).send({
            message: "Blog found successfully",
            userBlog
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while getting user blog" })
    }
})



module.exports = router;
