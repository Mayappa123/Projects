// routes/auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((user) => {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
