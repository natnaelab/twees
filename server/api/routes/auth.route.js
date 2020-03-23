const router = require("express").Router();

// controller files
const register = require("../controllers/register.auth"); // REGISTER/SIGN UP CONTROLLER
const login = require("../controllers/login.auth"); // REGISTER/SIGN UP CONTROLLER

// @route       POST /api/auth/register
// @desc        register new user
// @access      public
router.post("/register", register);

// @route       POST /api/auth/register
// @desc        register new user
// @access      public
router.post("/login", login);

module.exports = router;
