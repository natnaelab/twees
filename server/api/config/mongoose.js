const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.info("mongoDB has been connected!"));
