const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const sampleProducts = require("./init/data");
// const Product = require("./models/product")
const ejsMate = require("ejs-mate");
const initDB = require("./init/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);

initDB()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

app.get("/products", (req, res) => {
  res.render("product/products.ejs", { products: sampleProducts.data });
});
app.get("/", (req, res) => {
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

app.get("/product/new", (req, res) => {
  res.render("product/new.ejs");
});

app.post("/product/add", async (req, res) => {
  let product = req.body;
  console.log(product);
  console.log(req.body);
});



app.listen(port, () => {
  console.log("Hi this is my app...");
});
