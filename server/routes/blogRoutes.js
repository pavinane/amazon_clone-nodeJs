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
  uploadImages,
} = require("../controller/blogController");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, disLikeBlog);
router.put("/:id", authMiddleware, isAdmin, updatBlog);

router.get("/:id", idBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogs);

module.exports = router;
