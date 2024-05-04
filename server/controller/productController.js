const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require("slugify");
const User = require("../models/userModels");
const validateMongoDBId = require("../utils/validateMongoBid");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

// create Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body);

    res.status(202).json({
      message: "Prodcut create successfully",
      data: [product],
    });
  } catch (error) {
    throw new Error("Product not created");
  }
});

// Get All product

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // this is another method to implemented query
    // const getProduct = await Product.where("category").equals(
    //   req.query.category
    // );

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // make query for the perticular product to get
    let query = Product.find(JSON.parse(queryStr));

    // Sorting;
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v"); // (-__v) mention like this that perticular only remove
    }

    // pagination  queries
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page doesn't exist");
    }

    console.log(page, limit, skip);

    const products = await query;

    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    throw new Error("failed Get all Product ");
  }
});

// Get product by id
const getProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getProductbyId = await Product.findById(id);

    res.status(200).json({
      message: "Succesfully get products by ID",
      data: [getProductbyId],
    });
  } catch (error) {
    throw new Error("Cannot get all product");
  }
});

// ProductUpdate
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const productUpdate = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Successfully product updated",
      data: productUpdate,
    });
  } catch (error) {
    throw new Error("product not be updated");
  }
});
// DeleteProdcut
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  try {
    const productDelete = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfult product Deleted",
      data: [productDelete],
    });
  } catch (error) {
    throw new Error("product not be updated");
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { prodId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyadded = user?.wishlist?.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error("not added wishlist");
  }
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  try {
    const product = await Product.findById(prodId);
    const alreadyRated = product?.rating?.find(
      (item) => item.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Update existing rating
      const updateRating = await Product.updateOne(
        {
          "rating.postedby": _id, // Filter by the user ID
          _id: prodId, // Additional filter for the product ID
        },
        {
          $set: { "rating.$.star": star, "rating.$.comment": comment }, // Update the star rating
        },
        {
          new: true,
        }
      );
    } else {
      // Add new rating
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            rating: { star, comment, postedby: _id }, // Push a new rating object
          },
        },
        {
          new: true,
        }
      );
    }

    const getallratings = await Product.findById(prodId);
    let ratings = getallratings.rating.length;
    let ratingSum = getallratings.rating
      .map((item) => item.star)
      .reduce((prev, cur) => prev + cur, 0);
    let actualRating = Math.round(ratingSum / ratings);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  console.log(req?.files);
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProductId,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  ratingProduct,
  uploadImages,
};
