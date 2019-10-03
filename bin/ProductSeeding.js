const mongoose = require("mongoose");
const Types = mongoose.Types;
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");
const Faker = require("faker");

const bcryptSalt = 10;
// var randomObjId = require('mongoose').Types.ObjectId();
// let ObjectId id = new ObjectId();
const newId2 = new mongoose.Types.ObjectId()

mongoose
  .connect('mongodb://localhost/ichibizz', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  let products = [
    {
      name: Faker.commerce.productName(),
      description: Faker.lorem.sentences(),
      imageUrl: [
        Faker.image.imageUrl(),
        Faker.image.imageUrl(),
        Faker.image.imageUrl()
      ],
      brand: Faker.lorem.word(),
      category: Faker.commerce.product(),
      price: Faker.commerce.price(),
      currency: Faker.finance.currencyCode(),
      tags: [
        Faker.random.word(),
        Faker.random.word(),
        Faker.random.word(),
        Faker.random.word()
      ],
      latitude: Faker.address.latitude(),
      longitude: Faker.address.longitude(),
      availability: Faker.date.future(),
      warrantyUntil: Faker.date.future(),
      quantity: Faker.random.number({min: 1, max: 5}),
      status: "used",
      isSold: false,
      seller: new Types.ObjectId(),
      buyer: new Types.ObjectId(),
      wishlist: [
        new Types.ObjectId(),
        new Types.ObjectId()
      ],
      requested: [
        new Types.ObjectId(),
        new Types.ObjectId()
      ],
    }
  ];

  Product.deleteMany()
  .then(() => {
    return Product.create(products)
  })
  .then(productsCreated => {
    console.log(`${productsCreated.length} products created with the following id:`);
    console.log(productsCreated.map(p => p._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })