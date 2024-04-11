const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// create Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(202).json({
      message: "Prodcut create successfully",
      data: [product],
    });
  } catch (error) {
    throw new Error("Product not created");
  }
});

// Get All product
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getProduct = await Product.find();
    res.status(200).json({
      status: "Success",
      data: [getProduct],
    });
  } catch (error) {
    throw new Error("Successfully Get all Product ");
  }
});

// Get product by id
const getProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getProductbyId = await Product.findById(id);

    res.status(200).json({
      message: "Succesfully get products by ID",
      data: [getProductbyId],
    });
  } catch (error) {
    throw new Error("Cannot get all product");
  }
});

module.exports = { createProduct, getProductId, getAllProduct };
