//db.js

const mongoose = require("mongoose");
const Product = require("../models/product.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/shopcart";

async function initDB() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Product.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj }));
  await Product.insertMany(initData.user);

  console.log("Data initialized successfully...");
}

module.exports = initDB;
