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
  const seller = req.user._id;

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
    isSold: false,
    seller: seller
  })
    .then(product => {
      // console.log(`PRODUCT:`, product);
      res.status(200).json(product);
    })
    .catch(err => {
      res.json(`ERROR creating product:`, err);
    });
});

// ============ CRUD: GET METHOD ============ //

// GET /api/products/:id
router.get("/:id", (req, res) => {
  // console.log(`START GET route...`);
  Product.findById(req.params.id)
    .then(product => {
      // console.log(`[productDetail.js] GET route: product`, product);
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

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.json(err);
    });
});

// EDIT/api/products/sell/:id
router.put("/sell/:id", (req, res) => {
  const { isSold, buyer } = req.body;
  Product.findByIdAndUpdate(
    req.params.id,
    { isSold: isSold, buyer: buyer },
    { new: true }
  )
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT Request /api/products/request/:id
router.put("/request/:id", (req, res) => {
  let id = req.params.id;
  console.log("mounted");
  console.log("id", id);
  console.log("req user", req.user._id);
  Product.findByIdAndUpdate(
    id,
    { $push: { requested: req.user._id } },
    { new: true }
  )
    .populate("requested")
    .then(product => {
      console.log("request push", product);
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});
// ============ CRUD: UPDATE METHOD ============ //

// GET /api/products/:id
router.put("/edit/:id", (req, res) => {
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

  console.log(`START UPDATE route...`);
  Product.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true }
  )
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.json(err);
    });
});

// REMOVE /api/products/wish/remove/:id
router.put("/wish/remove/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(
    id,
    { $pull: { wishlist: req.user._id } },
    { new: true }
  )
    .populate("wishlist")
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.json(err);
    });
});

// ADD /api/products/wish/add/:id
router.put("/wish/add/:id", (req, res) => {
  let id = req.params.id;

  Product.findByIdAndUpdate(
    id,
    { $push: { wishlist: req.user._id } },
    { new: true }
  )
    .populate("wishlist")
    .then(product => {
      // console.log(product);
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
