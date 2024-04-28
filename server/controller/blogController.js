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
  //   validateMongoDBId(id);
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

// const likeBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.body;

//   // Check if blogId is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(blogId)) {
//     console.log("Invalid blogId:", blogId);
//     return res.status(400).json({ message: "Invalid blogId" });
//   }

//   try {
//     // Find the blog by its Id
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       console.log("Blog not found for blogId:", blogId);
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     // Find the user's ID
//     const loginUserId = req.user?._id;
//     if (!loginUserId) {
//       console.log("User not authenticated");
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     // Check if the user has already liked the blog
//     const alreadyLiked = blog.likes.includes(loginUserId);

//     if (alreadyLiked) {
//       // If already liked, remove the like
//       await Blog.findByIdAndUpdate(blogId, {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       });
//     } else {
//       // If not liked, add the like
//       await Blog.findByIdAndUpdate(blogId, {
//         $addToSet: { likes: loginUserId },
//         isLiked: true,
//       });
//     }

//     // Return the updated blog
//     const updatedBlog = await Blog.findById(blogId);
//     res.json(updatedBlog);
//   } catch (error) {
//     console.error("Error in likeBlog:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = {
  createBlog,
  updatBlog,
  idBlog,
  getAllBlogs,
  deleteBlogs,
  likeBlog,
};
