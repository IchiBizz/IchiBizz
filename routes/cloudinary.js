const express = require('express');
const router  = express.Router();

// Cloudinary uploader
const uploader = require('../configs/cloudinary');

router.post('/new/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log('Image to be uploaded: ', req.file)

    if (!req.file) {
      next(new Error('ERROR uploading image!'));
      return;
    }
    // use same secure_url variable in the frontend
    res.json({ secure_url: req.file.secure_url });
})

module.exports = router;