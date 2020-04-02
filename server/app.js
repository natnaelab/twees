const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const passport = require("passport");
const path = require("path");

require("./api/config/mongoose");
require("./api/config/passport")(passport);

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARE FUNCTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(compression());

// root route
app.use("/", (req, res) => {
  res.send("OK");
});

// routes
const auth = require("./api/routes/user.route");
const post = require("./api/routes/post.route");

app.use("/api/auth", auth); // user authorization route
app.use("/api/post", post); // post route

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
