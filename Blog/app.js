// app.js 

const express = require('express');

const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const sampleBlogs = require("./init/blogData");
const ejsMate = require("ejs-mate");
const initDB = require("./init");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const { data } = require("./init/blogData");

const app = express();
const port = 8040;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);

// Passport middleware
const sessionOptions = {
  secret: "mayappa",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

data.forEach((product) => {
  //console.log(`Product Name: ${product.productname}, UUID: ${product.id}`);
});

initDB()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
  });

app.get("/blogs", (req, res) => {
  res.render("blogs/blogs.ejs", { blogData: sampleBlogs.data });
});

app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.get("/product/edit", (req, res) => {
  res.render("./product/edit.ejs", { product });
});

app.get("/products/new", (req, res) => {
  res.render("product/new.ejs");
});

app.listen(port, () => {
  console.log("app is running")
})

