const router = require("express").Router();
const privateRoute = require("../middlewares/private_route");

// controller files
const newPost = require("../controllers/new.post"); // new post
// delete post
// like post

// @route       POST /api/post
// @desc        add new post
// @access      private
router.post("/", privateRoute, newPost);

module.exports = router;
