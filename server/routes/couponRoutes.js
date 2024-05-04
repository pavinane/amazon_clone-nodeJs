const express = require("express");
const {
  createCoupon,
  getAllCoupon,
} = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/all", authMiddleware, getAllCoupon);

module.exports = router;
