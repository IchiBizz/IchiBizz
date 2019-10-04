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
    "Furniture", "Tailoring", "Sales", "Hair Shop", "Music", "Office", "Butchery", "Bakery", "Kiosk", "Editing", "Medicine", "Telecommunication", "Carpentry", "Decorating", "Wedding", "Ice Cream Store", "Cafeteria", "Restaurant", "Copy Shop", "Brewery", "Film", "Marketing", "Pharmacy", "Kitchen", "hotel", "accommodation"
  ];

  let brandsList = [
    "Wilkinson", "Bosch", "Siemens", "Brother", "LG", "Bang & Olufsen", "IB Laursen", "Ikea", "Bloomingville", "Madame Stoltz", "Sofa Company", "Mørteens", "Renault", "Manufaktum", "Bezerra", "Alessi", "JUKI", "Pfaff", "Dürkopp", "Bose", "Bodrum", "Apple", "IBM", "SAP", "Lenovo", "Ubanara"
  ];

  let tagsList = [
    "car", "phone", "computer", "table", "office", "ice production", "chair", "sofa", "shelf", "cupboard", "lamp", "music box", "bed", "cuttlery", "cutting machine", "drill", "kitchen", "reception", "matrice", "tablets", "bicycle", "laptop", "monitor", "telephone system", "cabinet", "printer"
  ]

  const seedInitialProducts = () => {
    for(let i = 0; i < 30; i++) {
      products.push(
        {
          title: Faker.lorem.sentence(),
          description: Faker.lorem.sentences(),
          imageUrl: [
            Faker.image.business(),
            Faker.image.business(),
            Faker.image.business(),
            Faker.image.business(),
            Faker.image.business(),
          ],
          brand: Faker.random.arrayElement(brandsList),
          category: Faker.random.arrayElement(businessTypes),
          price: Faker.finance.amount(10, 1999, 2),
          currency: Faker.finance.currencyCode(),
          tags: [
            Faker.random.arrayElement(tagsList),
            Faker.random.arrayElement(tagsList),
            Faker.random.arrayElement(tagsList),
            Faker.random.arrayElement(tagsList),
            Faker.random.arrayElement(tagsList)
          ],
          latitude: Faker.address.latitude(),
          longitude: Faker.address.longitude(),
          availability: Faker.date.future(),
          warrantyUntil: Faker.date.future(),
          quantity: Faker.random.number({min: 1, max: 5}),
          condition: "used",
          isSold: false,
          seller: new mongoose.Types.ObjectId(),
          buyer: new mongoose.Types.ObjectId(),
          wishlist: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId()
          ],
          requested: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId()
          ],
        }
      )
    }
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
  })