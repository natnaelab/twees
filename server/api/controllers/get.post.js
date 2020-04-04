const Post = require("../models/post.model");

module.exports = {
  getAll: (req, res) => {
    Post.find({}, "_id pic vid text type edited posted_by posted_at")
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
    Post.find({ posted_by }, "_id pic vid text type edited posted_by posted_at")
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
    Post.findById(_id, "_id pic vid text type edited posted_by posted_at")
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
