const Post = require("../models/post.model");
const validator = require("validator").default;
const isEmpty = require("../utils/isEmpty");

module.exports = (req, res) => {
  const postId = req.params.id;
  const edit = { edited: true };
  Object.assign(edit, req.body.edit);
  Post.findById(postId).then((post) => {
    if (post && post.posted_by == req.user.id)
      if (post.type === "text") {
        if (isEmpty(edit.text))
          return res
            .status(400)
            .json({ status: "error", message: "text field is required" });
        if (!validator.isLength(edit.text, { max: 400 })) {
          return res.status(400).json({
            status: "error",
            message: "character limit exceeded",
          });
        }
        if (edit.text === post.text)
          return res.status(400).json({
            status: "error",
            message: "you haven't made any change",
          });
        return Post.findByIdAndUpdate(postId, edit)
          .exec()
          .then(() => res.json({ status: "success" }))
          .catch((err) => {
            res.status(500).json({ status: "error", message: err.message });
          });
      }
    return res.status(404).json({ status: "error", message: "post not found" });
  });
};
