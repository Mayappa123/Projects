const express = require("express");
const mongoose = require("mongoose");
const port = 8000;
const app = express();
const User = require("./models/user");
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);


app.get("/", (req, res) => {
  res.render("register.ejs");
});

app.get("/about", (req, res) => {
  res.render("users/about.ejs");
});

app.listen(port, () => {
  console.log("Hi this is my app...");
});
