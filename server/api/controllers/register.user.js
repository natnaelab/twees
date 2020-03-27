const bcrypt = require("bcryptjs");
const avatar = require("../utils/avatar");

const { validateRegisterInput } = require("../validator/user.validator");
const User = require("../models/user.model");

module.exports = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let { username, password, confirm_password } = req.body;
  username = username.toLowerCase();

  // create new user object
  const newUser = new User({
    username,
    password,
    confirm_password,
    avatar: avatar(username)
  });

  // password hashing
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;

      // save new user to db
      newUser
        .save()
        .then(_ => {
          res.json({
            status: "success",
            message: "registration was successfull!"
          });
        })
        .catch(err => {
          if (err.errors.username && err.errors.username.kind == "unique") {
            errors.username = "username has already been taken!";
            res.status(403).json({ status: "error", errors });
          } else {
            res.status(500).json({
              status: "error",
              message: "An error occured trying to process your request"
            });
          }
        });
    });
  });
};
