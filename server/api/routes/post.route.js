const router = require("express").Router();
const privateRoute = require("../middlewares/private_route");
const upload = require("../config/multer");

// controller files
const newPost = require("../controllers/new.post"); // new post
// delete post
// like post
// edit post

// @route       POST /api/post
// @desc        add new post
// @access      private
router.post("/", privateRoute, upload.single("upload"), newPost);

module.exports = router;
