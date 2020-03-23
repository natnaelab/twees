const router = require("express").Router();

// controller files
const register = require("../controllers/register.auth"); // REGISTER/SIGN UP CONTROLLER

// @route       POST /api/auth/register
// @desc        register new user
// @access      public
router.post("/register", register);
