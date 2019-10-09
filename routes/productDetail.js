const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// ============ CRUD: POST METHOD ============ //

// POST '/api/products' => Create product
router.post("/new", (req, res) => {
  // console.log("[AddProduct.js]: POST route");
  // console.log("req body", req.body);
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
    city,
    address,
    country,
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
    location: {
      latitude: latitude,
      longitude: longitude,
      city: city,
      address: address,
      country: country
    },
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
  console.log(`START GET route...`)
  Product.findById(req.params.id)
    .then(product => {
      console.log(`[productDetail.js] GET route: product`, product);
      if (!product) {
        res.status(404).json(product);
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
