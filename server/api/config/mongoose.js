const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.info("mongoDB has been connected!"));
