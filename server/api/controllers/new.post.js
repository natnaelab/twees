const { validatePostInput } = require("../validator/post.validator");
const fs = require("fs");
const Post = require("../models/post.model");
const isEmpty = require("../utils/isEmpty");
const cloudUpload = require("../config/cloudinary");

module.exports = (req, res) => {
  let post = {};
  post.posted_by = req.user.id;
  Object.assign(post, req.body);

  const { errors, isValid } = validatePostInput(req.body);

  if (isEmpty(post.text) && isEmpty(req.file))
    res.status(400).json({ status: "failed", message: "empty post" });

  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (!req.file && post.text) {
    post.type = "text";
    return new Post(post)
      .save()
      .then(() => {
        res.json({ status: "success" });
      })
      .catch((err) => {
        res.status(400).json({ status: "error", message: err.message });
      });
  } else if (req.file) {
    let mimetype = req.file.mimetype;
    if (mimetype.includes("image")) {
      post.type = "pic";
      let pic = {};
      if (post.caption) {
        pic.caption = post.caption;
        delete post.caption;
      }
      cloudUpload(req.file.path, req.user.username, "image")
        .then((resp) => {
          fs.unlinkSync(req.file.path);
          pic.url = resp.url;
          post.pic = pic;
          return new Post(post)
            .save()
            .then((_) => {
              res.json({ status: "success" });
            })
            .catch((err) => {
              res.status(400).json({ status: "error", message: err.message });
            });
        })
        .catch((err) => {
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
          res.status(400).json({ status: "error", message: err.message });
        });
    } else if (mimetype.includes("video")) {
      post.type = "vid";
      let vid = {};
      if (post.caption) {
        vid.caption = post.caption;
        delete post.caption;
      }
      cloudUpload(req.file.path, req.user.username, "video")
        .then((resp) => {
          fs.unlinkSync(req.file.path);
          vid.url = resp.url;
          post.vid = vid;
          return new Post(post)
            .save()
            .then((_) => {
              res.json({ status: "success" });
            })
            .catch((err) => {
              res.status(400).json({ status: "error", message: err.message });
            });
        })
        .catch((err) => {
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
          res.status(400).json({ status: "error", message: err.message });
        });
    }
  }
};
