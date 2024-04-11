const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/getallproduct", authMiddleware, isAdmin, getAllProduct);
router.get("/:id", getProductId);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
