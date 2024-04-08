
//routes/user.js

// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const { isLoggedin, saveRedirectUrl } = require("../middleware");
// const WrapAsync = require("../utils/WrapAsync");
// const userController = require("../controllers/users");

// router
//   .route("/login")
//   .get(WrapAsync(userController.renderLoginForm))
//   .post(
//     saveRedirectUrl,
//     passport.authenticate("local", {
//       failureRedirect: "/login",
//       failureFlash: true,
//     }),
//     WrapAsync(userController.login)
//   );

// router
//   .route("/signup")
//   .get(WrapAsync(userController.renderSignupForm))
//   .post(WrapAsync(userController.signup));

// router.get("/logout", isLoggedin, WrapAsync(userController.logout));

// // router.post(
// //   "/updateProfile",
// //   isLoggedin,
// //   WrapAsync(userController.updateProfile)
// // );

// router.get("/contact", isLoggedin, WrapAsync(userController.contact));

// router.get("/about", isLoggedin, WrapAsync(userController.about));

// router.get("/user/active", isLoggedin, WrapAsync(userController.activeUser));

// module.exports = router;
