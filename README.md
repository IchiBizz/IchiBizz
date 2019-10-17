# IchiBizz

## 1. About the app

Getting rid of your business equipment is cumbersome. Closing your business and/or selling your business inventory requires a lot of patience and energy when existing marketplaces mainly focus on private users for used products.

IchiBizz is a dedicated marketplace for used business inventory. It connects existing or retiring business owners with new business owners that are lacking big budgets, networks and knowledge to get their business started.

This app aims to be a helpful solution for small business owners, freelancers, collectives, individuals and more out of a various list of business types such as restaurants, copy shops, rental services, pizzerias, editorials, cafés, clothing stores, co-working spaces, hostels, hair shops, etc.

## 2. About the project and team

This project is the final [Ironhack](https://ironhack.com) Berlin project built by [Noriko Takizawa](https://github.com/noliko-zwa), [Ninette Adhikari](https://github.com/ninetteadhikari) & [Thuy Le](https://github.com/1000miles).

We are Ironhack Berlin Web Development Graduates (Oct 2019) and plan to continue as a learning project to fix bugs, refactor code and to add more features in the future.

## 2. Stack & Tools Set

### 2.1 Stack

- MERN stack
  - MongoDB
  - ExpressJS
  - ReactJS
  - NodeJS
- Cloudinary (Images Upload)
- Material UI (Design)
- Google Maps
- FakerJS (Fake Data)
- Passport (Signup/Login)
- NPM (packages management)

### 2.2 External Stack & Tools

- Heroku (Hosting)
- MongoDB Compass
- Postman (http requests)

### 2.3 Next Tools & Features

- Nodemailer (Notifications for `requested` products and emails)
- Passport Social Login via Google, LinkedIn, Facebook
- GoogleVision (Tagging)
- Socket.io (Chat)
- Testing

## 3. Getting Started

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

### 3.1 Development

3.1 [Fork](https://help.github.com/en/articles/fork-a-repo) and clone this repo from your fork.

```shell
# Clone via ssh or https after fork
$ git clone git@github.com:YourUserName/IchiBizz.git OR git clone https://github.com/YourUserName/IchiBizz.git
$ cd IchiBizz
```
3.2 Navigate to the project and install all npm packages for the server app and react app.

```shell
# server app
$ npm install

# client app
$ npm install --prefix client/
```
3.3 Rename the `.env_SAMPLE` file to `.env` that has prefilled environment variables (ENV_VARS) for `PORT` and `NODE_ENV`. Make sure this file is always listed in `.gitignore`.

3.4 Seed the fake data for `User` (first) and `Product` (second).

```shell
# In the root directory
$ node bin/UserSeeding.js
$ node bin/ProductSeeding.js
```

3.5 Start the server app AND the react app.

```shell
# server
$ npm run dev

# client
$ npm start --prefix client/

OR
$ cd client/
$ npm start
```