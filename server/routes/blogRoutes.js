const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const {
  createBlog,
  updatBlog,
  idBlog,
} = require("../controller/blogController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updatBlog);
router.get("/:id", idBlog);

module.exports = router;
