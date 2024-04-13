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
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // this is another method to implemented query
    // const getProduct = await Product.where("category").equals(
    //   req.query.category
    // );

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // make query for the perticular product to get
    let query = Product.find(JSON.parse(queryStr));

    // Sorting;
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("__v");
    }

    const products = await query;

    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    throw new Error("failed Get all Product ");
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
