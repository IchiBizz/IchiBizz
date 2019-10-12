# IchiBizz

Competing against big companies is hard. Additionally, getting rid of your stuff is cumbersome. Closing your business and/or selling your business inventory requires a lot of patience because existing marketplaces mainly focus on private users for used products.

IchiBizz is a dedicated marketplace for used business inventory. It connects existing or retiring small business owners with new business owners that are lacking big budgets, networks and knowledge to get their business started.

## 1. Tools Set

- MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS)
- Cloudinary (Images Upload)
- Material UI (Design)
- Google Maps
- MongoDB Compass
- Heroku (Hosting)
- FakerJS (Fake Data)
- Passport (Signup/Login)

### 1.1 Next Features

- Nodemailer
- Passport Social Login via Google, LinkedIn, Facebook
- GoogleVision (Tagging)
- Socket.io (Chat)

## 2. Getting Started

Project Structure:

```shell
.
├── README.md
├── app.js
├── bin
├── client
├── configs
├── models
├── node_modules
├── package-lock.json
├── package.json
├── public
├── routes
└── views
```

### 2.1 Development

2.1 Clone the project and navigate to the project.

```shell
# ssh or https
$ git clone git@github.com:IchiBizz/IchiBizz.git OR git clone https://github.com/IchiBizz/IchiBizz.git
$ cd IchiBizz
```
2.2 Install all npm packages for the server app and react app.

```shell
# server app
$ npm install

# client app
$ npm install --prefix client/
```

2.3 Rename the `.env_SAMPLE` file to `.env` that have prefilled environment variables (ENV_VARS) for `PORT` and `NODE_ENV`. Make sure this file is always listed in `.gitignore`.

2.4 Seed the fake data for `User` (first) and `Product` (second).

```shell
# In the root directory
$ node bin/UserSeeding.js
$ node bin/ProductSeeding.js
```

2.5 Start the server app AND the react app.

```shell
# server
$ npm run dev

# client
$ npm start --prefix client/

OR
$ cd client/
$ npm start
```