const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//post create productsdetail

router.post("/", (req, res) => {
  const {
    name,
    description,
    imageUrl,
    brand,
    category,
    price,
    currency,
    pickupLocation,
    availability,
    warrantyPeriod,
    quantity,
    status
  } = req.body;

  Product.create({
    name: name,
    description: description,
    imageUrl: imageUrl,
    brand: brand,
    category: category,
    price: price,
    currency: currency,
    pickupLocation: pickupLocation,
    availability: availability,
    warrantyPeriod: warrantyPeriod,
    quantity: quantity,
    status: status,
    isSold: false
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
