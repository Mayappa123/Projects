// app.js

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const { main } = require("./init/index.js");
const passport = require("passport");
const User = require("./models/user");
const session = require("express-session");
const flash = require("connect-flash");
const Blog = require("./models/blog.js");
const methodOverride = require("method-override");
const { isLoggedin, isOwner, saveRedirectUrl } = require("./middleware.js");
const LocalStrategy = require("passport-local").Strategy;

const port = 8040;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname));
app.engine("ejs", ejsMate);

const sessionOptions = {
  secret: "mayappa",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
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

main();

//Users related routes...
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back on Blogify!");
    let redirectUrl = res.locals.redirectUrl || "/blogs";
    res.redirect(redirectUrl);
  }
);

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to Blogify!!!");
      res.redirect("/blogs");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are logged out now...");
      res.redirect("/login");
    }
  });
});

app.get("/contact", (req, res) => {
  res.render("blogs/contact.ejs");
});

app.get("/about", (req, res) => {
  res.render("blogs/about.ejs");
});

app.get("/user/active", (req, res) => {
  res.render("users/activeUser.ejs", { currUser: req.user });
});


//Blogs related routes...
//index route
app.get("/blogs", async (req, res) => {
  const Allblogs = await Blog.find({});
  res.render("blogs/index.ejs", { Allblogs });
});


// new route
app.get("/blogs/new", isLoggedin, (req, res) => {
  res.render("blogs/new.ejs");
});


//show route
app.get("/blogs/:id", isLoggedin, async (req, res) => {
  let { id } = req.params;
  const blog = await Blog.findById(id).populate("owner");
  if (!blog) {
    req.flash("error", "blog does'nt exist...");
    res.redirect("/blogs");
  }
  res.render("blogs/show.ejs", { blog });
});


//create route
app.post("/blogs", isLoggedin, async (req, res) => {
  const newBlog = new Blog(req.body.blog);
  newBlog.owner = req.user._id;
  await newBlog.save();
  console.log(newBlog);
  req.flash("success", "New blog created...");
  res.redirect("/blogs");
});


//edit route
app.get("/blogs/:id/edit", isLoggedin, isOwner, async (req, res) => {
  let { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    req.flash("error", "Blog does'nt exists...");
    res.redirect("/blogs");
  }
  res.render("blogs/edit.ejs", { blog });
});


//update route
app.put("/blogs/:id", isLoggedin, isOwner, async (req, res) => {
  console.log(req.body);
  let { id } = req.params;
  try {
    let blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    await blog.save();
    req.flash("success", "Blog updated successfully.");
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    console.error("Error updating blog:", error);
    req.flash("error", "Failed to update blog.");
    res.redirect(`/blogs/${id}`);
  }
});


//delete blog
app.delete("/blogs/:id", isLoggedin, isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash("success", "blog deleted successfully...");
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});


//search blog
app.get("/blogs/:id/search", isLoggedin, async (req, res) => {
  try {
    const { id } = req.params;
    const { search } = req.query;
    const blogs = await Blog.find({
      owner: mongoose.Types.ObjectId(id),
      subject: { $regex: new RegExp(search, "i") },
    });
    res.render("blogs/index.ejs", { blogs });
  } catch (error) {
    console.error("Error searching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log("app is running");
});
