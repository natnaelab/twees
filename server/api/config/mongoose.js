const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.mongooseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
