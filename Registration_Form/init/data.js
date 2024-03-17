const { v4: uuidv4 } = require("uuid");

const sampleProducts = [
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Coca-Cola",
    description:
      "The iconic fizzy drink loved worldwide, offering a refreshing blend of cola flavor.",
    quantity: 100,
    category: "Food & Groceries",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Kellogg's Corn Flakes",
    description:
      "Crunchy, golden flakes made from corn, a nutritious breakfast option.",
    quantity: 100,
    category: "Food & Groceries",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg",
    productname: "Lays Potato Chips",
    description: "Crispy, flavorful, classic snack. Enjoy and take taste",
    quantity: 100,
    category: "Food & Groceries",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Maggie instant Noodles",
    description:
      "A quick and convenient meal option loved by all ages, offering delicious noodles in a variety of flavors.",
    quantity: 100,
    category: "Home Goods",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Coca-Cola",
    description:
      "The iconic fizzy drink loved worldwide, offering a refreshing blend of cola flavor.",
    quantity: 100,
    category: "Electronics",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Kellogg's Corn Flakes",
    description:
      "Crunchy, golden flakes made from corn, a nutritious breakfast option.",
    quantity: 100,
    category: "Food & Groceries",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg",
    productname: "Lays Potato Chips",
    description: "Crispy, flavorful, classic snack. Enjoy and take taste",
    quantity: 100,
    category: "Beauty Products",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Maggie instant Noodles",
    description:
      "A quick and convenient meal option loved by all ages, offering delicious noodles in a variety of flavors.",
    quantity: 100,
    category: "Electronics",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Coca-Cola",
    description:
      "The iconic fizzy drink loved worldwide, offering a refreshing blend of cola flavor.",
    quantity: 100,
    category: "Beauty Products",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Kellogg's Corn Flakes",
    description:
      "Crunchy, golden flakes made from corn, a nutritious breakfast option.",
    quantity: 100,
    category: "Electronics",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg",
    productname: "Lays Potato Chips",
    description: "Crispy, flavorful, classic snack. Enjoy and take taste",
    quantity: 100,
    category: "Home Goods",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Maggie instant Noodles",
    description:
      "A quick and convenient meal option loved by all ages, offering delicious noodles in a variety of flavors.",
    quantity: 100,
    category: "Health & Wellness",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Coca-Cola",
    description:
      "The iconic fizzy drink loved worldwide, offering a refreshing blend of cola flavor.",
    quantity: 100,
    category: "Toys & Games",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Kellogg's Corn Flakes",
    description:
      "Crunchy, golden flakes made from corn, a nutritious breakfast option.",
    quantity: 100,
    category: "Books & Media",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg",
    productname: "Lays Potato Chips",
    description: "Crispy, flavorful, classic snack. Enjoy and take taste",
    quantity: 100,
    category: "Toys & Games",
  },
  {
    id: uuidv4(),
    image: "https://m.media-amazon.com/images/I/41eN+JCtNiL.jpg",
    productname: "Maggie instant Noodles",
    description:
      "A quick and convenient meal option loved by all ages, offering delicious noodles in a variety of flavors.",
    quantity: 100,
    category: "Stationery & Office Supplies",
  },
];

module.exports = { data: sampleProducts };
