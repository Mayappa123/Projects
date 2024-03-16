const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const sampleProducts = require("./init/data");
const Product = require("./models/product");
const User = require("./models/user");
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

app.get("/user/register", (req, res) => {
  res.render("users/signup.ejs");
});

app.get("/product/new", (req, res) => {
  res.render("product/new.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/product/add", async (req, res) => {
  console.log(req.body);
  try {
    const { productname, description, quantity, category, image } = req.body;
    const newProduct = new Product({
      productname,
      description,
      quantity,
      category,
      image,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log("Hi this is my app...");
});
