const express = require("express");
const { registerUser, loginUser, currentuser } = require("../controllers/userController");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/current", currentuser); 

module.exports = router;
