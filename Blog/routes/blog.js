const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js")
const blogController = require("../controllers/blogs.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/new", isLoggedIn, listingController.renderNewForm);