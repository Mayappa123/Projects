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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "660655c37f9e4d2dac65a93a",
  }));
  await Blog.insertMany(initData.data);
  console.log("Data was initialized...");
};
//660655c37f9e4d2dac65a93a

module.exports = initDB;
