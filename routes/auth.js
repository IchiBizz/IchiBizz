const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

//post/ api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  // console.log(req.body.password);
  if (!password || password < 6) {
    return res
      .status(400)
      .json({ message: "the password must be min. 8 char." });
  }
  if (
    !(password.match(/[a-z]/) && password.match(/[A-Z]/) && /\d/.test(password))
  ) {
    return res.status(400).json({
      message:
        "the password must contain at leat one number and one capital letter."
    });
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
  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res
          .status(400)
          .json({ message: "this username is already taken by another user" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        username: username,
        password: hash,
        email: email
      }).then(dbUser => {
        //login user after signup

        req.login(dbUser, err => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting to login" });
          }
          res.json(dbUser);
          console.log("error?", dbUser);
        });
      });
    })
    .catch(err => {
      res.json(err);
    });
});

//login
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error While authentication" });
    }
    if (!user) {
      return res.status(500).json({ message: "wrong credentials" });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      console.log("login?", user);
      return res.json(user);
    });
  })(req, res);
});

module.exports = router;
