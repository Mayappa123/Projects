const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js")
const blogController = require("../controllers/blogs.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/new", isLoggedIn, blogController.renderNewForm);

router
  .route("/")
  .get(WrapAsync(blogController.index)) //index route
  .post(
    isLoggedIn,
    upload.single("blog[image]"),
    ValidateBlog,
    WrapAsync(blogController.createBlog)
  ); //create route

router
  .route("/:id")
  .get(WrapAsync(blogController.showBlog)) //show route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("blog[image]"),
    ValidateBlog,
    WrapAsync(blogController.updateBlog)
  ) //update route
  .delete(isLoggedIn, isOwner, WrapAsync(blogController.destroyBlog)); //delete route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(blogController.renderEditForm)
); //edit route

module.exports = router;