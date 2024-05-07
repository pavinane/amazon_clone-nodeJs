const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoBid");

const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});
const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});

const getColor = asyncHandler(async (req, res) => {
  try {
    const allColor = await Color.find();
    res.json(allColor);
  } catch (error) {
    throw new Error(error);
  }
});
const getidColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const idColor = await Color.findById(id);
    res.json(idColor);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  getColor,
  deleteColor,
  getidColor,
};
