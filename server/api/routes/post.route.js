const router = require("express").Router();
const privateRoute = require("../middlewares/private_route");
const upload = require("../config/multer");

// controller files
const newPost = require("../controllers/new.post"); // new post
const { getAll, getById, getByUser } = require("../controllers/get.post"); // get posts
// delete post
// edit post

// @route       POST /api/post
// @desc        add new post
// @access      private
router.post("/", privateRoute, upload.single("upload"), newPost);

// @route       GET /api/post
// @desc        get all posts
// @access      private
router.get("/", privateRoute, getAll);

// @route       GET /api/post/user/:user
// @desc        get all posts by user
// @access      private
router.get("/user/:user", privateRoute, getByUser);

// @route       GET /api/post/:id
// @desc        get all posts by post ID
// @access      private
router.get("/:id", privateRoute, getById);

module.exports = router;
