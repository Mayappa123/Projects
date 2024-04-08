//routes/blog.js

// const express = require("express");
// const router = express.Router();
// const Blog = require("../models/blog");
// const { isLoggedin, isOwner } = require("../middleware");
// const WrapAsync = require("../utils/WrapAsync");
// const blogController = require("../controllers/blogs");

// //Index route
// router.get("/blogs", isLoggedin, WrapAsync(blogController.index));

// //new route
// router.get("/blog/new", isLoggedin, WrapAsync(blogController.renderNewForm));

// router
//   .route("/blogs/:id")
//   .get(isLoggedin, WrapAsync(blogController.showBlog))
//   .put(isLoggedin, isOwner, WrapAsync(blogController.updateBlog))
//   .delete(isLoggedin, isOwner, WrapAsync(blogController.destroyBlog));

// //Create route
// router.post("/newBlog", isLoggedin, WrapAsync(blogController.createBlog));

// //Search route
// router.get("/:id/search", isLoggedin, WrapAsync(blogController.searchBlog));

// //edit route
// router.get(
//   "/blogs/:id/edit",
//   isLoggedin,
//   isOwner,
//   WrapAsync(blogController.renderEditForm)
// );

// module.exports = router;
