const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// POST '/api/products' => Create product
router.post("/", (req, res) => {
  console.log("[productDetail.js]: POST route");
  const {
    title,
    description,
    imageUrl,
    brand,
    category,
    quantity,
    price,
    currency,
    tags,
    company,
    latitude,
    longitude,
    availability,
    warrantyUntil,
    condition
  } = req.body;

  // FIXME: To be added after authentication setup
  // const owner = req.user._id;

  Product.create({
    title: title,
    description: description,
    // TODO: Allow to upload multiple images at once as soon as cloudinary is configured
    imageUrl: imageUrl,
    brand: brand,
    category: category,
    quantity: quantity,
    price: price,
    currency: currency,
    tags: tags,
    company: company,
    latitude: latitude,
    longitude: longitude,
    availability: availability,
    warrantyUntil: warrantyUntil,
    condition: condition,
    isSold: false
    // FIXME: To be added after authentication setup
    // seller: owner
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(`ERROR creating product:`, err);
    });
});

module.exports = router;
