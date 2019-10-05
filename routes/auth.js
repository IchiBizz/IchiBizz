const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//post/ api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  if (!password || password < 8) {
    return res
      .status(400)
      .json({ message: "the password must be min. 8 char." });
  }
  if (!email) {
    return res.status(400).json({ message: "the email can not be empty" });
  }
  User.findOne({ email: email }).then(found => {
    if (found) {
      return res
        .status(400)
        .json({ message: "this email is already used. try different email" });
    }
  });
  if (!username) {
    return res.status(400).json({ message: "the username can not be empty" });
  }
  User.findOne({ username: username }).then(found => {
    if (found) {
      return res
        .status(400)
        .json({ message: "this username is already taken by another user" });
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return User.create({
      username: username,
      password: password,
      email: email
    }).then(dbUser => {
      //login user after signup

      req.login(dbUser, err => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erroe while attempting to login" });
        }
        res.json(dbUser);
      });
    });
  });
});

// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { message: req.flash("error") });
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/auth/login",
//     failureFlash: true,
//     passReqToCallback: true
//   })
// );

// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

// router.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   if (username === "" || password === "") {
//     res.render("auth/signup", { message: "Indicate username and password" });
//     return;
//   }

//   User.findOne({ username }, "username", (err, user) => {
//     if (user !== null) {
//       res.render("auth/signup", { message: "The username already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       password: hashPass
//     });

//     newUser
//       .save()
//       .then(() => {
//         res.redirect("/");
//       })
//       .catch(err => {
//         res.render("auth/signup", { message: "Something went wrong" });
//       });
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

module.exports = router;
