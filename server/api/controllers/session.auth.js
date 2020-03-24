module.exports = (req, res, next) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar
  });
};
