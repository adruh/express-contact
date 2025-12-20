const express = require("express");
const { registerUser, loginUser, currentuser } = require("../controllers/userController");
const validationToken = require("../middleware/validateTokenhandler");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/current",validationToken, currentuser); 

module.exports = router;
