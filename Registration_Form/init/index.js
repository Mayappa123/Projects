//index.js

const mongoose = require("mongoose");
const Product = require("../models/product.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/shopcart";

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
  await Product.deleteMany({});
  await Product.insertMany(initData.data);
  console.log("Data was initialized...");
};

module.exports = initDB;

