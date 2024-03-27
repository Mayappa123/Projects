// app.js

const express = require("express");

const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const sampleBlogs = require("./init/blogData");
const ejsMate = require("ejs-mate");
const initDB = require("./init");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const flash = require("connect-flash");
const Blog = require("./models/blog");
// const { data } = require("./init/blogData");

const app = express();
const port = 8040;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);
app.use(flash());

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

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

initDB();

app.get("/blogs", (req, res) => {
  res.render("blogs/blogs.ejs", { blogData: sampleBlogs.data });
});

app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.get("/blogs/:id", async(req, res) => {
  let {id} = req.params;
  const blog = await Blog.findById(id);
  res.render("blogs/show.ejs", {blog});
})

app.get("/blogs/:id/edit", async (req, res) => {
  const { _id } = req.params;
  try {
    const blog = await Blog.findById(_id);
    res.render("blogs/edit.ejs", { blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.send("Error fetching blog");
  }
});

app.put("/blogs/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { subject, title, date, authorName, content } = req.body.blog;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      -id,
      { subject, title, date, authorName, content },
      { new: true }
    );
    console.log(updatedBlog);
    res.redirect(`/blogs/${id}`);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.send("Error updating blog");
  }
});

app.get("/blogs/new", (req, res) => {
  res.render("blogs/new.ejs");
});

app.listen(port, () => {
  console.log("app is running");
});
