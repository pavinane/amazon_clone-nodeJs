const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  ratingProduct,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

router.post("/", authMiddleware, isAdmin, createProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize
);
router.get("/getallproduct", authMiddleware, isAdmin, getAllProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", getProductId);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, ratingProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;
