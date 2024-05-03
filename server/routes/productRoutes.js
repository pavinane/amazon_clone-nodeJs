const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/getallproduct", authMiddleware, isAdmin, getAllProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", getProductId);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;
