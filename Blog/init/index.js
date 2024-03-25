//index.js

const mongoose = require("mongoose");
const Blog = require("../models/blog.js");
const initData = require("./blogData.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/blogify";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initData.data);
  console.log("Data was initialized...");
};

module.exports = initDB;
