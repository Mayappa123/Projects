const mongoose = require("mongoose");
const User = require("../models/user");
const initData = require("./data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/shopcart";

main()
  .then(() => {
    console.log("app successfully connected with database.");
  })
  .catch((err) => {
    console.log(err, "err to connect database");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await User.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj}))
    await User.insertMany(initData.user);
    console.log("Data initialized successfully...")
}

module.exports = initDB;
