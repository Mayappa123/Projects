const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const sampleProducts = require("./init/data");
const ejsMate = require("ejs-mate");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);


app.get("/products", (req, res) => {
  res.render("product/products.ejs", { products: sampleProducts.data });
});

app.get("/about", (req, res) => {
  res.render("users/about.ejs");
});

app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.listen(port, () => {
  console.log("Hi this is my app...");
});
