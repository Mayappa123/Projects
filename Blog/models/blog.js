// models/blog.js

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
