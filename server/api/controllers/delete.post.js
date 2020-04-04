const Post = require("../models/post.model");

module.exports = (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId)
    .exec()
    .then((resp) => {
      if (resp !== null) {
        return res.json({ status: "success" });
      }
      return res.json({ status: "error", message: "post not found" });
    })
    .catch((err) => {
      return res.status(500).json({ status: "error", message: err.message });
    });
};
