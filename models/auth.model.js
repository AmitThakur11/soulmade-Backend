const mongoose = require("mongoose");
const Product = require("./product.model");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: Number,
    },
  ],
  order: [
    {
      orderedProducts: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          qty: Number,
        },
      ],
      _id: String,
      address: {
        type: Object,
        default: {},
      },
      time: Date,
      paymentData: {
        payment_id: String,
        order_id: String,
        signature: String,
      },
      total: Number,
    },
  ],
  address: [
    {
      name: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        requird: true,
      },
      appartment: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
