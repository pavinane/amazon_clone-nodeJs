const express = require("express");
const {
  createColor,
  updateColor,
  getColor,
  deleteColor,
  getidColor,
} = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.get("/", authMiddleware, isAdmin, getColor);
router.get("/:id", authMiddleware, isAdmin, getidColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
