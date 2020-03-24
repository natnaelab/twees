const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const passport = require("passport");

require("./api/config/mongoose");
require("./api/config/passport")(passport);

const app = express();

// serve static files
app.use(express.static("public"));

// MIDDLEWARE FUNCTIONS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// routes
const auth = require("./api/routes/auth.route");

app.use("/api/auth", auth);

// Error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
