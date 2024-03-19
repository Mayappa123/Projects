// login.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("/users/login"); 
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/products", 
    failureRedirect: "/login", 
    failureFlash: true,
  })
);

module.exports = router;
