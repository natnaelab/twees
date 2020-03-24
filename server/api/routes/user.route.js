const router = require("express").Router();
const passport = require("passport");

// controller files
const register = require("../controllers/register.user"); // REGISTER/SIGN UP CONTROLLER
const login = require("../controllers/login.user"); // LOGIN CONTROLLER
const session = require("../controllers/session.user"); // CURRENT USER SESSION CONTROLLER

// @route       POST /api/auth/register
// @desc        register new user
// @access      public
router.post("/register", register);

// @route       POST /api/auth/login
// @desc        login user
// @access      public
router.post("/login", login);

// @route       GET /api/auth/session
// @desc        get current logged in user
// @access      private
router.get(
  "/session",
  passport.authenticate("jwt", { session: false }),
  session
);

module.exports = router;
