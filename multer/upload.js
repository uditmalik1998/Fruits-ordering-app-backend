const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formates: ["jpg", "jpeg"],
    transformation: [{ width: 100, height: 100, crop: "limit" }],
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     const suffix = `${Date.now()}-${file.originalname}`;
//     cb(null, suffix);
//   },
// });

// const upload = multer({ storage: storage });

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
