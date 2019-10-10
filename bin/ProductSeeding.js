const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Product = require("../models/Product");
const Faker = require("faker");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/ichibizz", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let products = [];
let businessTypes = [
  "Furniture",
  "Tailor Shop",
  "Hair Shop",
  "Agency",
  "Butchery",
  "Bakery",
  "Kiosk",
  "Editing",
  "Medicine",
  "Telecommunication",
  "Carpentry",
  "Decoration",
  "Ice Cream Store",
  "Cafeteria",
  "Restaurant",
  "Copy Shop",
  "Brewery",
  "Pharmacy",
  "Kitchen",
  "Hotel",
  "Software Development",
  "IT",
  "NGO",
  "Co-working Space",
  "Rental Service",
  "Candy Store",
  "Pizzeria",
  "Museum",
  "Art Gallery",
  "Grocery Store",
  "Lawyer",
  "Repair Store",
  "Bike Store"
];

let categories = [
  "Film",
  "Music",
  "Medicine",
  "Print",
  "Sport",
  "Fitness",
  "Manufacturing",
  "Craftsmanship",
  "Art",
  "Education",
  "Science",
  "Sales",
  "Marketing",
  "Social Work",
  "Pschology",
  "Beverages & Food",
  "Shopping",
  "Clothing",
  "Carpentry",
  "Journalism",
  "Events",
  "Accommodation",
  "Technology",
  "Photography",
  "Legal Services",
  "Mechanics"
]

let brandsList = [
  "Wilkinson",
  "Bosch",
  "Siemens",
  "Brother",
  "LG",
  "Bang & Olufsen",
  "IB Laursen",
  "Ikea",
  "Bloomingville",
  "Madame Stoltz",
  "Sofa Company",
  "Mørteens",
  "Renault",
  "Manufaktum",
  "Bezerra",
  "Alessi",
  "JUKI",
  "Pfaff",
  "Dürkopp",
  "Bose",
  "Bodrum",
  "Apple",
  "IBM",
  "SAP",
  "Lenovo",
  "Ubanara",
  "Bosch",
  "Black & Decker"
];

// Tags can be used by buyers search for products and sellers to categorize their products
let tagsList = [
  "car",
  "phone",
  "computer",
  "table",
  "office",
  "ice production",
  "chair",
  "sofa",
  "shelf",
  "cupboard",
  "lamp",
  "music box",
  "bed",
  "cuttlery",
  "cutting machine",
  "drill",
  "kitchen",
  "reception",
  "matrice",
  "tablets",
  "bicycle",
  "laptop",
  "monitor",
  "telephone system",
  "cabinet",
  "printer"
];

let loremIpsumLong = [
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  "Lorem ipsum på svenska är en klar förbättring version på den uppskattade Lorem ipsum varianten. Sociala nätverk kan aldrig fånga en fisk. En annan sak är att man ibland går ensam till de olika festerna. Niklas tog tag i datorn och lyfte den mot himmeln. Så nu tar vi en paus och inväntar resultatet av dagens skrivande."
];

const productNames = [
  "Bosch Power Tools Combo Kit CLPK22-120", "Bosch Electric Tankless Water Heater", "Bosch JS260 120-Volt Top-Handle Jigsaw", "Acer SB220Q bi 21.5 Full HD (1920 x 1080)", "Lenovo Flex 14 2-in-1 Convertible Laptop, 14 Inch FHD Touchscreen Display", "Beats Solo3 Wireless On-Ear Headphones - Matte Black", "Ubiquiti UniFi AC Lite AP - Wireless Access Point - 802.11 B/A/G/n/AC Wireless Access Point", "Watch Battery Replacement Tool Kit", "Office Chair | Innovadesk Comfy Chair", "Computer Desk 47 - Office Table", "South Shore 4-Shelf Storage Bookcase, Royal Cherry", "Nathan James 65503 Theo 5-Shelf Wood Ladder Bookcase", "Wood Computer Monitor Stand Raiser Black with 3 Tier Desktop Organizer", "Brother Business Color Laser Printer, HL-L8360CDW, WLAN", "Canon TS9120 Wireless All-In-One Printer with Scanner and Copier", "HP Laserjet Pro M148dw All-in-One Wireless Monochrome Laser Printer (4PA41A)"
]

let conditions = ["used", "new"];

const seedInitialProducts = () => {
  User.find().then(users => {
    users.forEach(user => console.log(user._id));
    for (let i = 0; i < 100; i++) {
      // randomSeller includes the current user
      let randomSeller = users[Math.floor(Math.random() * users.length)];
      // randomBuyer is incremented (by 1, 2, 3) to ensure the buyer is not the current user buying their own selling product
      let randomBuyer1 =
        users[(Math.floor(Math.random() * users.length) + 1) % 10];
      let randomBuyer2 =
        users[(Math.floor(Math.random() * users.length) + 2) % 10];
      let randomBuyer3 =
        users[(Math.floor(Math.random() * users.length) + 3) % 10];
      let randomBuyer4 =
        users[(Math.floor(Math.random() * users.length) + 4) % 10];

      products.push({
        title: Faker.random.arrayElement(productNames),
        description: Faker.random.arrayElement(loremIpsumLong),
        imageUrl: [
          // returns e.g. "http://lorempixel.com/640/480/business"
          Faker.image.business(),
          Faker.image.business(),
          Faker.image.business(),
          Faker.image.business(),
          Faker.image.business()
        ],
        brand: Faker.random.arrayElement(brandsList),
        category: Faker.random.arrayElement(categories),
        quantity: Faker.random.number({ min: 1, max: 10 }),
        // returns integer between 10 (min) and 1999 (max) as 2 decimals
        price: Faker.finance.amount(10, 4999, 2),
        // We only use EUR => hard-coded
        currency: "EUR",
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
          longitude: Faker.address.longitude(),
          city: Faker.address.city(),
          address: Faker.address.streetAddress(),
          country: Faker.address.country()
        },
        availability: Faker.date.recent(),
        warrantyUntil: Faker.date.future(),
        condition: Faker.random.arrayElement(conditions),
        isSold: false,
        seller: randomSeller._id,
        buyer: randomBuyer1._id,
        wishlist: [
          // randomBuyer without current user
          randomBuyer1._id,
          randomBuyer2._id,
          randomBuyer3._id
        ],
        requested: [randomBuyer2._id, randomBuyer4._id]
      });
    }
  });
};

seedInitialProducts();

Product.deleteMany()
  .then(() => {
    return Product.create(products);
  })
  .then(productsCreated => {
    console.log(
      `${productsCreated.length} products created with the following id:`
    );
    console.log(productsCreated.map(p => p._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
