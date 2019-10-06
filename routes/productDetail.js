const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// ============ CRUD: POST METHOD ============ //

// POST '/api/products' => Create product
router.post("/", (req, res) => {
  console.log("[AddProduct.js]: POST route");
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

  // console.log(`[AddProduct.js] req.body.condition`, req.body.condition)

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
    // TODO: To be added after authentication setup
    // seller: owner
  })
  .then(product => {
    console.log(`PRODUCT:`, product);
    res.status(200).json(product);
  })
  .catch(err => {
    res.json(`ERROR creating product:`, err);
  });
});

// ============ CRUD: GET METHOD ============ //

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Product.findById(req.params.id)
    console.log(`[AddProduct.js] Product.findById`, req.params.id)
    .then(product => {
      if (!product) {
        res.status(404).json(product);
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      res.json(`NOT FOUND`, err);
    });
});

module.exports = router;
