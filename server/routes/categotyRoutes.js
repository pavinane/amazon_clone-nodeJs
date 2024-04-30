const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
} = require("../controller/categoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/", authMiddleware, isAdmin, getCategory);

module.exports = router;
