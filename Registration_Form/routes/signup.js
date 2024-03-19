// signup.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.get("/signup", (req, res) => {
  res.render("/users/signup"); 
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/products");
    });
  } catch (error) {
    console.error(error);
    res.redirect("/signup");
  }
});

module.exports = router;
