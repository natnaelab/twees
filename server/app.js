const express = require("express");
const logger = require("morgan");
const compression = require("compression");

require("./api/config/mongoose");

const app = express();

// MIDDLEWARE FUNCTIONS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// routes
const auth = require("./api/routes/auth.route");

app.use("/api/auth", auth);

module.exports = app;
