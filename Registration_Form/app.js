const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const sampleProducts = require("./init/data");
const Product = require("./models/product");
const User = require("./models/user");
const ejsMate = require("ejs-mate");
const initDB = require("./init/db");
const methodOverride = require("method-override");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));


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



app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});


app.get("/user/register", (req, res) => {
  res.render("users/signup.ejs");
});


app.get("/product/new", (req, res) => {
  res.render("product/new.ejs");
});


app.get("/product/edit", (req, res) => {
  res.render("./product/edit.ejs")
})


// GET request to display a single product
app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product/show", { product }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// GET request to render edit page for a product
app.get('/edit/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('edit', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// DELETE request to delete a product
app.delete('/delete/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.redirect('/products'); // Redirect to product listing page
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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
  console.log("app is running...");
});
