const router = require("express").Router();

// controller files
const register = require("../controllers/register.auth"); // REGISTER/SIGN UP CONTROLLER
const login = require("../controllers/login.auth"); // LOGIN CONTROLLER
const session = require("../controllers/session.auth"); // LOGIN CONTROLLER

// @route       POST /api/auth/register
// @desc        register new user
// @access      public
router.post("/register", register);

// @route       POST /api/auth/login
// @desc        login user
// @access      public
router.post("/login", login);

// @route       POST /api/auth/register
// @desc        register new user
// @access      private
router.post("/session", session);

module.exports = router;
