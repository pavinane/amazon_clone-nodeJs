const Brand = require("../models/blogCateModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoBid");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  try {
    const allBrand = await Brand.find();
    res.json(allBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getidBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const idBrand = await Brand.findById(id);
    res.json(idBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
  getidBrand,
};
