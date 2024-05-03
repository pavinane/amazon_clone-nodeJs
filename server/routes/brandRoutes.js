const express = require("express");
const {
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
  getidBrand,
} = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.get("/", authMiddleware, isAdmin, getBrand);
router.get("/:id", authMiddleware, isAdmin, getidBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
