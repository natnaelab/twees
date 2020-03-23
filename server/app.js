const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");

require("./api/config/mongoose");

const app = express();

// MIDDLEWARE FUNCTIONS
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

module.exports = app;
