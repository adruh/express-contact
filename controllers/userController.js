const asyncHandler = require("express-async-handler");


// @desc   Register a new user
// @route   post /api/register
// @access  Public
const registerUser = asyncHandler(async  (req, res) => {
    const { username, email, password } = req.body;
    res.json({ message: "Register the user" });
});

 // @desc   login a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async  (req, res) => {
    res.json({ message: "Register the user" });
});

 // @desc   Register a new user
// @route   GET /api/register
// @access  Public
const currentuser = asyncHandler(async  (req, res) => {
    res.json({ message: "Register the user" });
});

module.exports = {
    registerUser,
    currentuser,
    loginUser
};