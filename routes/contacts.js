const express = require("express");
const router = express.Router;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

router.post("/", (req, res, next) => {
  console.log("sent", req.body);    
  let { userEmail, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter
    .sendMail({
      from: userEmail,
      to: "noicomimo79@gmail.com",
      subject: subject,
      text: message,
      html: `<b>${message}</b>`
    })
    .then(info => res.json({ message: "done" }))
    .catch(err => console.log(err));
});

module.exports = router;
