const Blog = require("../models/blogModel");
const USer = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const validateMongoBid = require("../utils/validateMongoBid");

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

module.exports = { createBlog, updatBlog, idBlog };
