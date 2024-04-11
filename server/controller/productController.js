const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");

// create Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
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

// ProductUpdate
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Successfully product updated",
      data: [productUpdate],
    });
  } catch (error) {
    throw new Error("prodcut not be updated");
  }
});
// DeleteProdcut
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  try {
    const productDelete = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfult product Deleted",
      data: [productDelete],
    });
  } catch (error) {
    throw new Error("prodcut not be updated");
  }
});

module.exports = {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
