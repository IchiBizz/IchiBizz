const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
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

let users = [];

// Full Faker Data
const seedInitialUsers = () => {
  for (let i = 0; i < 10; i++) {
    users.push({
      username: Faker.internet.userName(),
      email: Faker.internet.email(),
      password: bcrypt.hashSync("faker", bcrypt.genSaltSync(bcryptSalt)),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      address: {
        street: Faker.address.streetName(),
        houseNumber: Faker.random.number({ min: 1, max: 250 }),
        postCode: Faker.random.number({ min: 10000, max: 90000 }),
        city: Faker.address.city(),
        country: Faker.address.country()
      },
      phoneNumber: Faker.phone.phoneNumber(),
      stars: Faker.random.number({ min: 0, max: 5 }),
      reviews: Faker.lorem.paragraphs()
    });
  }
};

seedInitialUsers();

// Add Noriko, Ninette, Thuy, Bob and Alice
users.push(
  {
    username: "noriko",
    email: "noriko@noriko.io",
    password: bcrypt.hashSync("noriko", bcrypt.genSaltSync(bcryptSalt)),
    firstName: "Noriko",
    lastName: Faker.name.lastName(),
    address: {
      street: Faker.address.streetName(),
      houseNumber: Faker.random.number({ min: 1, max: 250 }),
      postCode: Faker.random.number({ min: 10000, max: 90000 }),
      city: "Berlin",
      country: "Germany"
    },
    phoneNumber: Faker.phone.phoneNumber(),
    stars: Faker.random.number({ min: 0, max: 5 }),
    review: Faker.lorem.paragraphs()
  },
  {
    username: "ninette",
    email: "ninette@ninette.io",
    password: bcrypt.hashSync("ninette", bcrypt.genSaltSync(bcryptSalt)),
    firstName: "Ninette",
    lastName: Faker.name.lastName(),
    address: {
      street: Faker.address.streetName(),
      houseNumber: Faker.random.number({ min: 1, max: 250 }),
      postCode: Faker.random.number({ min: 10000, max: 90000 }),
      city: "Berlin",
      country: "Germany"
    },
    phoneNumber: Faker.phone.phoneNumber(),
    stars: Faker.random.number({ min: 0, max: 5 }),
    review: Faker.lorem.paragraphs()
  },
  {
    username: "thuy",
    email: "thuy@thuy.io",
    password: bcrypt.hashSync("thuy", bcrypt.genSaltSync(bcryptSalt)),
    firstName: "Thuy",
    lastName: Faker.name.lastName(),
    address: {
      street: Faker.address.streetName(),
      houseNumber: Faker.random.number({ min: 1, max: 250 }),
      postCode: Faker.random.number({ min: 10000, max: 90000 }),
      city: "Berlin",
      country: "Germany"
    },
    phoneNumber: Faker.phone.phoneNumber(),
    stars: Faker.random.number({ min: 0, max: 5 }),
    review: Faker.lorem.paragraphs()
  },
  {
    username: "bob",
    email: Faker.internet.email(),
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    firstName: "Bob",
    lastName: Faker.name.lastName(),
    address: {
      street: Faker.address.streetName(),
      houseNumber: Faker.random.number({ min: 1, max: 250 }),
      postCode: Faker.random.number({ min: 10000, max: 90000 }),
      city: Faker.address.city(),
      country: Faker.address.country()
    },
    phoneNumber: Faker.phone.phoneNumber(),
    stars: Faker.random.number({ min: 0, max: 5 }),
    review: Faker.lorem.paragraphs()
  },
  {
    username: "alice",
    email: Faker.internet.email(),
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    firstName: "Alice",
    lastName: Faker.name.lastName(),
    address: {
      street: Faker.address.streetName(),
      houseNumber: Faker.random.number({ min: 1, max: 250 }),
      postCode: Faker.random.number({ min: 10000, max: 90000 }),
      city: Faker.address.city(),
      country: Faker.address.country()
    },
    phoneNumber: Faker.phone.phoneNumber(),
    stars: Faker.random.number({ min: 0, max: 5 }),
    reviews: Faker.lorem.paragraphs()
  }
);

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
