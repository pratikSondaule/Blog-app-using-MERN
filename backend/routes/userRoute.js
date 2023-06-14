const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

// Register User

router.post("/register", async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                message: "Please fill the details"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        return res.status(201).send({ message: "User registered successfully", user })

    } catch (error) {
        console.error(error)
    }
});

// Login route

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill the details"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).send({
                message: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send({
                message: "Invalid credentials"
            })
        }

        res.status(200).send({
            message: "Login Successfully",
            user
        })

    } catch (error) {
        console.error(error);
    }
});

// Get all user

router.get("/all-users", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).send({
            message: "All user data",
            userCount: users.length,
            users
        })

    } catch (error) {
        console.error(error);
    }
})


module.exports = router;
