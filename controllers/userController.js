const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// @desc   Register a new user
// @route   post /api/register
// @access  Public
const registerUser = asyncHandler(async  (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("Email is already used")
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password: ",hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log(`user created  ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.json(400);
        throw new Error("User data is not valid")
    }
    // res.json({ message: "Register the user" });
});

 // @desc   login a user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async  (req, res) => {
    const {email,password} =req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required")
    }  
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                email:user.email,
                username:user.username,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m'}
    )
    console.log("accessToken",accessToken)
        res.status(200).json({accessToken})
    }else{
        res.json(401)
        throw new Error("Email or password is invalid")
    } 
});

 // @desc   Register a new user
// @route   GET /api/register
// @access  private
const currentuser = asyncHandler(async  (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    currentuser,
    loginUser
};