const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  Date: { type: Date, default: Date.now }
});

module.exports = model("user", UserSchema.plugin(uniqueValidator));
