const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, path.join(__dirname, "../../public/uploads/images"));
    if (file.mimetype === "video/mp4" || file.mimetype === "video/x-matroska")
      cb(null, path.join(__dirname, "../../public/uploads/videos"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

let fileSizeLimit = 100 * (1024 * 1024); // 100MB || (1024 * 1024) = MB

module.exports = multer({ storage, limits: { fileSize: fileSizeLimit } });
