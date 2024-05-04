const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");
const validateMongoDBId = require("../utils/validateMongoBid");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const allCoupon = await Coupon.find();
    res.json(allCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getIdCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const idCoupon = await Coupon.findByIdAndUpdate(id);
    res.json(idCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const idupdateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(idupdateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const idDeleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(idDeleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupon,
  getIdCoupon,
  updateCoupon,
  deleteCoupon,
};
