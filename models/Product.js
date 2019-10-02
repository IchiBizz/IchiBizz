const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  imageUrl: [String],
  brand: String,
  category: String,
  price: Number,
  currency: String,
  tags: [String],
  pickupLocation: [Number],
  availability: Date,
  warrantyPeriod: String,
  quantity: Number,
  status: String,
  isSold: Boolean,
  //only one seller per product
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  //only one buyer per product
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  // wishlist  is the list of people adding the product to their wishlist to follow up later
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  //requested list is list of people who contacts the buyer to inform they are requester to purchase the product
  requested: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;