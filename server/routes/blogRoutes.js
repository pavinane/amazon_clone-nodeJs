const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const {
  createBlog,
  updatBlog,
  idBlog,
  getAllBlogs,
  deleteBlogs,
  likeBlog,
  disLikeBlog,
} = require("../controller/blogController");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updatBlog);

router.get("/:id", idBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogs);

module.exports = router;
