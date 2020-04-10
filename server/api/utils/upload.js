const cloudinary = require("../config/cloudinary");

module.exports = (path, username) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { folder: `avatar/${username}` },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};
