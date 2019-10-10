const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET userList /api/users/ */
router.get("/", (req, res) => {
  User.find()
    .then(user => {
      if (!user) {
        res.status(400).json(user);
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
