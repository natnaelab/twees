const cloudinary = require("cloudinary").v2;

const {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret
} = process.env;

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret
});

module.exports = file => {
  cloudinary.uploader.upload(
    file => result => {
      return { url: result.url };
    },
    { resource_type: "auto" }
  );
};
