const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  avatar: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = model("user", UserSchema.plugin(uniqueValidator));
