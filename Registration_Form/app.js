//app.js

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
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const { isLoggedin } = require("./middleware");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

// Set up session middleware
const sessionOptions = {
  secret: "mayappa",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// const logRequest = (req, res, next) => {
//   console.log(
//     `[${new Date().toLocaleString()}] req made to : ${req.originalUrl}`
//   );
//   next();
// };

// app.use(logRequest);

initDB()
  .then(() => {
    console.log("Database initialized");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
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

app.get("/signup", (req, res) => {
  //let {name = "anonymous"} = req.query;
  //req.session.name = name;
  //req.flash("success", "user registered succefully...");
  res.render("users/signup.ejs");
});

app.get("/product/edit", (req, res) => {
  res.render("./product/edit.ejs", { product });
});

app.get("/add", isLoggedin, (req, res) => {
  res.render("product/new.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .send("Username, email, and password are required.");
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      //req.flash("success", "Welcome to shopcart")
      res.redirect("/products");
    });
  } catch (error) {
    console.log("error is -> ", error);
     res.status(500).send("Internal Server Error");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    await res.redirect("/products");
  }
);

// Show Product
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

//Create Product
app.post("/add", isLoggedin, async (req, res) => {
  console.log(req.body);
  const newProduct = new Product(req.body.product);
  await newProduct.save();
  //req.flash("success", "new product created...");
  res.redirect("/products");
});

// Edit Product
app.get("/edit/:id", isLoggedin, async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    //req.flash("error", product doesnt exist in your shop);
    res.redirect("/products");
  }
  res.render("/product/edit.ejs");
});

//Update Product
app.put("/:id", isLoggedin, async (req, res) => {
  let { id } = req.params;
  await Product.findByIdAndUpdate(id, { ...req.body.product });
  //req.flash("success", "Product updated...");
  res.redirect(`/products/${id}`);
});

// Delete Product
app.delete("/:id", isLoggedin, async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Product.findByIdAndDelete(id);
  console.log(deletedListing);
  //req.flash("success", "Product deleted...");
  res.redirect("/listing");
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    //req.flash("success", "you are logged out...");
    res.redirect("/products");
  });
});

app.listen(port, () => {
  console.log("app is running...");
});
