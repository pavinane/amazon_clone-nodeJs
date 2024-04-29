const Blog = require("../models/blogModel");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoBid");
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const updatBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const idBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //   validateMongoDBId(id);
  try {
    const getidBlog = await Blog.findById(id);
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json({ getidBlog, updateViews });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBlogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deleteIdBlogs = await Blog.findByIdAndDelete(id);
    res.json(deleteIdBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  console.log("blogId", blogId);
  validateMongoDBId(blogId);
  //   find the blog which one you want to be like
  const blog = await Blog.findById(blogId);
  //  Find the user id
  const loginUserId = req?.user?._id;
  // find if the user liked the blog
  const isLiked = blog?.isLiked;
  // find if the user disliked the blog
  //   const alreadyDisliked = blog?.dislikes?.find(
  //     (userId = userId?.toString() === loginUserId?.toString())
  //   );
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;

  validateMongoDBId(blogId);
  //   find the blog which one you want to be like
  const blog = await Blog.findById(blogId);
  //  Find the user id
  const loginUserId = req?.user?._id;
  // find if the user liked the blog
  const isDisLiked = blog?.isDisliked;

  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});

module.exports = {
  createBlog,
  updatBlog,
  idBlog,
  getAllBlogs,
  deleteBlogs,
  likeBlog,
  disLikeBlog,
};
