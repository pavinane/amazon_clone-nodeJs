const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

router.post("/", createProduct);
router.get("/getallproduct", getAllProduct);
router.get("/:id", getProductId);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
