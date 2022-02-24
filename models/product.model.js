const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: Number,
  badge: String,

  description: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
  size: [{ type: String }],
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  fastDeleivery: {
    type: Boolean,
    required: true,
  },
  brand: String,
  features: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
