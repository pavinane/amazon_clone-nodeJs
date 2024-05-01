const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  getidCategory,
} = require("../controller/blogCateController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.get("/", authMiddleware, isAdmin, getCategory);
router.get("/:id", authMiddleware, isAdmin, getidCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
