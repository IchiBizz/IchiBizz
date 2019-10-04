const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");
const Faker = require("faker");

const bcryptSalt = 10;

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

  let products = [];
  let businessTypes = [
    "Furniture", "Tailoring", "Sales", "Hair Shop", "Music", "Office", "Butchery", "Bakery", "Kiosk", "Editing", "Medicine", "Telecommunication", "Carpentry", "Decorating", "Wedding", "Ice Cream Store", "Cafeteria", "Restaurant", "Copy Shop", "Brewery", "Film", "Marketing", "Pharmacy", "Kitchen", "Hotel", "Accommodation"
  ];

  let brandsList = [
    "Wilkinson", "Bosch", "Siemens", "Brother", "LG", "Bang & Olufsen", "IB Laursen", "Ikea", "Bloomingville", "Madame Stoltz", "Sofa Company", "Mørteens", "Renault", "Manufaktum", "Bezerra", "Alessi", "JUKI", "Pfaff", "Dürkopp", "Bose", "Bodrum", "Apple", "IBM", "SAP", "Lenovo", "Ubanara"
  ];

  // Tags can be used by buyers search for products and sellers to categorize their products
  let tagsList = [
    "car", "phone", "computer", "table", "office", "ice production", "chair", "sofa", "shelf", "cupboard", "lamp", "music box", "bed", "cuttlery", "cutting machine", "drill", "kitchen", "reception", "matrice", "tablets", "bicycle", "laptop", "monitor", "telephone system", "cabinet", "printer"
  ]

  const seedInitialProducts = () => {
    User.find().then(users => {
      users.forEach(user=>console.log(user._id))
      for(let i = 0; i < 30; i++) {

        // randomSeller includes the current user
        let randomSeller = users[Math.floor(Math.random() * users.length)]
        // randomBuyer is incremented (by 1, 2, 3) to ensure the buyer is not the current user buying their own selling product
        let randomBuyer1 = users[( Math.floor(Math.random() * users.length) +1) % 10]
        let randomBuyer2 = users[( Math.floor(Math.random() * users.length) +2) % 10]
        let randomBuyer3 = users[( Math.floor(Math.random() * users.length) +3 ) % 10]
        let randomBuyer4 = users[( Math.floor(Math.random() * users.length) +4 ) % 10]

        products.push(
          {
            title: Faker.lorem.sentence(),
            description: Faker.lorem.sentences(),
            imageUrl: [
              // returns e.g. "http://lorempixel.com/640/480/business"
              Faker.image.business(),
              Faker.image.business(),
              Faker.image.business(),
              Faker.image.business(),
              Faker.image.business(),
            ],
            brand: Faker.random.arrayElement(brandsList),
            category: Faker.random.arrayElement(businessTypes),
            quantity: Faker.random.number({min: 1, max: 10}),
            // returns integer between 10 (min) and 1999 (max) as 2 decimals
            price: Faker.finance.amount(10, 1999, 2),
            currency: Faker.finance.currencyCode(),
            tags: [
              Faker.random.arrayElement(tagsList),
              Faker.random.arrayElement(tagsList),
              Faker.random.arrayElement(tagsList),
              Faker.random.arrayElement(tagsList),
              Faker.random.arrayElement(tagsList)
            ],
            company: Faker.company.companyName(),
            // Pickup Location (can be different from user address)
            location: {
              latitude: Faker.address.latitude(),
              longitude: Faker.address.longitude()
            },
            availability: Faker.date.future(),
            warrantyUntil: Faker.date.future(),
            condition: "used",
            isSold: false,
            seller: randomSeller._id,
            buyer: randomBuyer1._id,
            wishlist: [
              // randomBuyer without current user
              randomBuyer1._id,
              randomBuyer2._id,
              randomBuyer3._id
            ],
            requested: [
              randomBuyer2._id,
              randomBuyer4._id
            ],
          }
        )
      }
    })
  }

  seedInitialProducts();

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
  });