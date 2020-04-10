const Post = require("../models/post.model");

module.exports = {
  getAll: (req, res) => {
    Post.find({}, "_id youtube text type edited posted_by posted_at")
      .sort({ posted_at: -1 })
      .populate("posted_by", "_id username avatar")
      .exec()
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        res.status(500).json({ status: "error", message: err.message });
      });
  },
  getByUser: (req, res) => {
    let posted_by = req.params.user;
    Post.find({ posted_by }, "_id youtube text type edited posted_by posted_at")
      .sort({ posted_at: -1 })
      .populate("posted_by", "_id username avatar")
      .exec()
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        res.status(500).json({ status: "error", message: err.message });
      });
  },
  getById: (req, res) => {
    let _id = req.params.id;
    Post.findById(_id, "_id youtube text type edited posted_by posted_at")
      .populate("posted_by", "_id username avatar")
      .exec()
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(500).json({ status: "error", message: err.message });
      });
  },
};
