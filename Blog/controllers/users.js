

// //controllers/users.js

// const User = require("../models/user");

// module.exports.renderSignupForm = (req, res) => {
//   res.render("users/signup.ejs");
// };

// module.exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({
//       username,
//       email,
//     });
//     const registeredUser = await User.register(newUser, password);
//     req.login(registeredUser, (err) => {
//       if (err) {
//         return next();
//       }
//       req.flash("success", "Welcome to Blogify");
//       res.redirect("/blogs");
//     });
//   } catch (e) {
//     req.flash("errror", e.message);
//     res.redirect("/signup");
//   }
// };

// module.exports.renderLoginForm = (req, res) => {
//   res.render("users/login.ejs");
// };

// module.exports.login = async (req, res) => {
//   req.flash("success", "welcome to Blogify...");
//   let redirectUrl = res.locals.redirectUrl || "/blogs";
//   res.redirect(redirectUrl);
// };

// module.exports.logout = (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     else {
//       req.flash("success", "You are logged out now...");
//       res.redirect("/login");
//     }
//   });
// };

// // module.exports.updateProfile = async (req, res) => {
// //   const { username, email, contact } = req.body;
// //   try {
// //     const user = await User.findById(req.user.id);
// //     user.username = username;
// //     user.email = email;
// //     user.contact = contact;

// //     if (req.file) {
// //       user.profileImage = req.file.filename;
// //     }
// //     await user.save();
// //     res.redirect("/user/active");
// //   } catch (error) {
// //     console.error("Error updating profile:", error);
// //     res.status(500).send("Error updating profile");
// //   }
// // };

// module.exports.contact = (req, res) => {
//   res.render("blogs/contact.ejs");
// };

// module.exports.about = (req, res) => {
//   res.render("blogs/about.ejs");
// };

// module.exports.activeUser = (req, res) => {
//   res.render("users/activeUser.ejs", { currUser: req.user });
// };
