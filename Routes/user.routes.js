const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user.model");

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user instance
        const newUser = new UserModel({ name, email, password: hashedPassword });
        // Save the user to the database
        await newUser.save();
        res.status(201).send({ msg: "A new user has been registered" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// User login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ msg: "Wrong email or password" });
        }
        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Wrong email or password" });
        }
        // If email and password are correct, generate token
        const token = jwt.sign({ userId: user._id }, "your_secret_key");
        res.status(200).send({ msg: "Login successful", token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all users
userRouter.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({}, { password: 0 }); // Exclude password from response
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = {
    userRouter
};