const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  posted_by: { type: Schema.Types.ObjectId, ref: "user", required: true },
  type: { type: String, enum: ["text", "pic", "vid"] },
  text: String,
  pic: {
    caption: String,
    url: String,
  },
  vid: {
    caption: String,
    url: String,
  },
  edited: { type: Boolean, default: false },
  posted_at: { type: Date, default: Date.now },
});

module.exports = model("post", postSchema);
