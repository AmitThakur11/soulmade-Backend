const Product = require("../models/product.model");

const product_param = async (req, res, next, id) => {
  try {
    const findProduct = await Product.findById(id);
    req.params = findProduct;
    next();
  } catch (error) {
    res.status(400).json({
      success: "false",
      msg: error.message,
    });
  }
};

const address_param = async (req, res, next, id) => {
  try {
    const findAddress = await Product.findById(id);
    req.params = findAddress;
    next();
  } catch (error) {
    res.status(400).json({
      success: "false",
      msg: error.message,
    });
  }
};

const orderParam = async (req, res, next, id) => {
  try {
    req.orderId = id;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

const eval_param = {
  product_param,
  address_param,
  orderParam,
};

module.exports = eval_param;
