const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String,
    address: {
      street: String,
      houseNumber: String,
      postCode: Number,
      city: String
    },
    country: String,
    phoneNumber: Number,
    stars: Number,
    review: [String]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
