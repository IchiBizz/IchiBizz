const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// ============ CRUD: POST METHOD ============ //

// POST '/api/products' => Create product
router.post("/new", (req, res) => {
  console.log("[AddProduct.js]: POST route");
  console.log("req body", req.body);
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
  console.log(`START GET route...`);
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

// DELETE /api/products/:id
router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "delete successful" });
    })
    .catch(err => {
      res.json(err);
    });
});

//TODO: this might be an overlap with edit page put request so need to be reviewed for match.
// EDIT/api/products/:id
router.put("/sell/:id", (req, res) => {
  const { isSold } = req.body;
  Product.findByIdAndUpdate(
    req.params.id,
    { isSold: isSold, buyer: req.user._id },
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
      console.log(product);
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// ADD Request /api/products/request/:id
router.put("/request/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(
    id,
    { $push: { requested: req.user._id } },
    { new: true }
  )
    .populate("requested")
    .then(product => {
      console.log(product);

      res.json(product);
    })
    .catch(err => {
      console.log(err);

      res.json(err);
    });
});

module.exports = router;
