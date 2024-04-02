// models/blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
