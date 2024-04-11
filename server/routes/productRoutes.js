const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProductId,
  getAllProduct,
} = require("../controller/productController");

router.post("/", createProduct);
router.get("/getallproduct", getAllProduct);
router.get("/:id", getProductId);

module.exports = router;
