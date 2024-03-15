const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  image: {
    url: String,
    filename: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 60,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;


/*id: {
    type: String,
    default: uuidv4, 
    required: true,
  },*/