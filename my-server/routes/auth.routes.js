// import necessary modules
const express = require("express");
const authController = require("../controllers/auth.controller");

// Creating instance of Express router
const router = express.Router();

// Defining routes for authentication signing up and logging in
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;