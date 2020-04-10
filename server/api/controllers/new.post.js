const { validatePostInput } = require("../validator/post.validator");
const Post = require("../models/post.model");

module.exports = (req, res) => {
  let newPost = {};
  newPost.posted_by = req.user.id;
  Object.assign(newPost, req.body);

  const { errors, isValid } = validatePostInput(req.body);

  if (!newPost.text && !newPost.youtube)
    return res.status(400).json({ status: "error", message: "empty post" });

  if (!isValid) {
    return res.status(400).json(errors);
  }

  return new Post(newPost).save().then((resp) => {
    res.json({ status: "success" });
  });
};
