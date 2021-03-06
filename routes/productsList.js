const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET '/api/products' => Get all products on the client
router.get("/", (req, res) => {
  Product.find()
    .populate("requested")
    .populate("wishlist")
    .populate("seller")
    .populate("buyer")
    .then(products => {
      if (!products) {
        res.status(400).json(products);
      } else {
        res.json(products);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
