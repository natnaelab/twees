const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  type: { type: String, enum: ["text", "pic", "vid"] },
  text: String,
  pic: [{ caption: String, uri: String }],
  vid: [{ caption: String, uri: String }],
  edited: { type: Boolean, default: false }
});

module.exports = model("post", postSchema);
