const ExtractJwt = require("passport-jwt").ExtractJwt,
  JwtStrategy = require("passport-jwt").Strategy;

const User = require("../models/user.model");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
opts.secretOrKey = process.env.jwtSecret;

// check if user is authorized
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => {
          throw err;
        });
    })
  );
};
