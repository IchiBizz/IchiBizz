const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const imgStorage = cloudinaryStorage({
  cloudinary,
  folder: "ichibizz_gallery",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: function(req, res, cb) {
    // Save original name on cloudinary
    cb(null, res.originalname);
  }
});
const uploader = multer({ storage: imgStorage });

module.exports = uploader;
