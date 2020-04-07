const User = require("../models/user.model");

module.exports = (req, res) => {
  const update = req.body;
  if (update.bio || update.username || update.avatar)
    User.findById(req.user.id).then((user) => {
      user
        .updateOne(update)
        .exec()
        .then(() => {
          res.json({ status: "success" });
        })
        .catch((err) => {
          res.status(500).json({ status: "error", message: err.message });
        });
    });
};
