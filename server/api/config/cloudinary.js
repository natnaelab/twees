const cloudinary = require("cloudinary").v2;

module.exports = file => {
  cloudinary.uploader.upload(
    file => result => {
      return { url: result.url };
    },
    { resource_type: "auto" }
  );
};
