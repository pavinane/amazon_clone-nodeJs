const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Auth middleware for checking token authorization
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode?.id);
        req.user = user;
        next();
        // console.log("decode", decode);
      }
    } catch (error) {
      throw new Error("Your authorized token expired ,please login again");
    }
  } else {
    throw new error("There is no token attached");
  }
});

// Admin controller for  checking user role is admin or not

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });

  if (adminUser?.role !== "admin") {
    throw new Error("You are not Admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
