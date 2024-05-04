const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  getIdCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/all", authMiddleware, getAllCoupon);
router.get("/:id", authMiddleware, getIdCoupon);
router.put("/:id", authMiddleware, updateCoupon);
router.delete("/:id", authMiddleware, deleteCoupon);

module.exports = router;
