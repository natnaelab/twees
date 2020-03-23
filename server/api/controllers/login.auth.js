const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import login validator
const { validateLoginInput } = require("../validator/auth.validator");
const User = require("../models/user.model");

module.exports = (req, res) => {
  // validate login form
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    // check if user exist
    if (!user) {
      errors.username = "user not found";
      res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        // user & pass was correct
        // sign jwt token

        let payload = { id: user.id, username: user.username }; // jwt payload

        jwt.sign(payload, process.env.jwtSecret, (err, token) => {
          res.json({ status: "success", token: "Bearer " + token });
        });
      } else {
        errors.password = "incorrect password";
        return res.status(403).json(errors);
      }
    });
  });
};
