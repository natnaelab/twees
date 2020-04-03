const cloudinary = require("cloudinary").v2;

const {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret
} = process.env;

module.exports = (path, username, fileType) => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: cloudinary_cloud_name,
      api_key: cloudinary_api_key,
      api_secret: cloudinary_api_secret
    });
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "auto",
        folder: `posts/${username}/${fileType}`
      },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
