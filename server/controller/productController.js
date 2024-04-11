const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  res.json({
    message: "It is product api working",
  });
});

module.exports = { createProduct };
