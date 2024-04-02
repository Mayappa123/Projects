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
const methodOverride = require("method-override");
const { isLoggedin } = require("./middleware.js");

const app = express();
const port = 8040;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

// Passport middleware
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

initDB();

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
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
      req.flash("success", "Welcome to Blogify");
      res.redirect("/blogs");
    });
  } catch (error) {
    console.log("error : ", error);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "welcome to Blogify...");
    await res.redirect("/blogs");
  }
);

app.get("/logout", isLoggedin, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out now...");
    res.redirect("/login");
  });
});


app.get("/blogs", isLoggedin, async (req, res) => {
  const blogs = await Blog.find({});
  res.render("blogs/blogs", { blogData: blogs });
});

app.get("/", (req, res) => {
  res.render("includes/home.ejs");
});

app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.get("/blogs/:id", isLoggedin, async (req, res) => {
  let { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("blogs/show.ejs", { blog });
});

// app.delete("/blogs/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await Blog.findByIdAndDelete(id);
//     res.redirect("/blogs");
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/blog/new", isLoggedin, (req, res) => {
  res.render("blogs/new.ejs");
});

//Create route
app.post("/blogs/new", isLoggedin, async (req, res) => {
  try {
    const newBlog = new Blog(req.body.blog);
    await newBlog.save();
    console.log(newBlog);
    res.redirect("/blogs");
  } catch (error) {
    console.log(`error is..... ${error}`);
  }
});

//edit route
app.get("/blogs/:id/edit", isLoggedin, async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render("blogs/edit.ejs", { blog });
});

//Update route
app.put("/blogs/:id", isLoggedin, async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
  await updatedBlog.save();
  console.log(updatedBlog);
  res.redirect("/blogs");
});

// app.put("/blogs/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(id, {...req.body.blog});
//     if (!updatedBlog) {
//       return res.status(404).send("Blog not found");
//     }
//     await updatedBlog.save();
//     console.log("Blog updated successfully:", updatedBlog);
//     res.redirect("/blogs");
//   } catch (error) {
//     console.error("Error updating blog:", error);
//   }
// });

app.get("/contact", isLoggedin, (req, res) => {
  res.render("blogs/contact.ejs");
});

app.get("/about", isLoggedin, (req, res) => {
  res.render("blogs/about.ejs");
});

app.get("/user/active", isLoggedin, (req, res) => {
  res.render("users/activeUser.ejs", { currUser: req.user });
});

app.post("/updateProfile", isLoggedin, async (req, res) => {
  const { username, email, contact } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.username = username;
    user.email = email;
    user.contact = contact;

    if (req.file) {
      user.profileImage = req.file.filename;
    }
    await user.save();
    res.redirect("/user/active");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
});

app.listen(port, () => {
  console.log("app is running");
});
