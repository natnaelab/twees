const Post = require("../models/post.model");

module.exports = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (post) {
        if (post.posted_by == req.user.id)
          return Post.findByIdAndDelete(postId)
            .then(() => {
              res.json({ status: "success" });
            })
            .catch((err) => {
              res.json({ status: "error", message: err.message });
            });
      }
      return res
        .status(404)
        .json({ status: "error", message: "post not found" });
    })
    .catch((err) =>
      res.status(500).json({ status: "error", message: err.message })
    );
};
