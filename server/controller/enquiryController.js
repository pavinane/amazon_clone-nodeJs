const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoBid");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  try {
    const allEnquiry = await Enquiry.find();
    res.json(allEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getidEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const idEnquiry = await Enquiry.findById(id);
    res.json(idEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  getEnquiry,
  deleteEnquiry,
  getidEnquiry,
};
