const generateToken = require("../config/jwtoken");
const User = require("../models/userModels");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoBid");
const { generateRefereshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");
const uniqid = require("uniqid");

// Register controller to create Account
async function createUser(req, res) {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;
    // exiting new User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seem like account created using this firstName",
      });
    }

    // creating new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      mobile,
    });

    const savedUser = await newUser.save();
    const { ...user_data } = savedUser._doc;
    console.log("newUser", savedUser);
    res.status(200).json({
      staus: "Success",
      data: [user_data],
      message: "Your account is created succcessfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal server Error",
    });
  }
}

// Login controller to login by user

const loginUser = asyncHandler(async (req, res) => {
  // Add your login logic here

  try {
    const { email, password } = req.body;

    const formerUser = await User.findOne({ email });

    if (formerUser && (await formerUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefereshToken(formerUser?._id);
      const updateUser = await User.findByIdAndUpdate(
        formerUser?._id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      // formerUser.refreshToken = refreshToken;
      // await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      // res.clearCookie("refreshToken");

      const loginUsersDara = {
        _id: formerUser?._id,
        firstName: formerUser?.firstName,
        lastName: formerUser?.lastName,
        email: formerUser?.email,
        mobile: formerUser?.mobile,
        role: formerUser?.role,
        token: generateToken(formerUser?._id),
      };
      res.status(200).json({
        staus: "Success",
        data: [loginUsersDara],
        message: "Your account is created succcessfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      staus: "failed",
      data: [],
      message: "Your account is login failed",
    });
  }
});

// Admin controll
const loginAdmin = asyncHandler(async (req, res) => {
  // Add your login logic here

  try {
    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefereshToken(findAdmin?._id);
      const updateUser = await User.findByIdAndUpdate(
        findAdmin?._id,
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
      // findAdmin.refreshToken = refreshToken;
      // await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      // res.clearCookie("refreshToken");

      const loginUsersDara = {
        _id: findAdmin?._id,
        firstName: findAdmin?.firstName,
        lastName: findAdmin?.lastName,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        role: findAdmin?.role,
        token: generateToken(findAdmin?._id),
      };
      res.status(200).json({
        staus: "Success",
        data: [loginUsersDara],
        message: "Your account is created succcessfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      staus: "failed",
      data: [],
      message: "Your account is login failed",
    });
  }
});

// creating refresh token for yser who loggedIn
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("there is no refresh token");

  const refreshToken = cookie?.refreshToken;
  // console.log(refreshToken);
  const user = await User.findOne({ refreshToken });

  if (!user)
    throw new Error("there is no referesh token in DB or not matched ");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
    if (err || user.id !== decode.id) {
      throw new Error("There is something wrong in refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });

  // res.status(200).json({
  //   staus: "Success",
  //   data: [accessToken],
  //   message: "Your account is created succcessfully",
  // });
});

// LoggOut

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("there is no refresh token");

  const refreshToken = cookie?.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true, // Fixed typo
    });
    return res.sendStatus(204); // forbidden
  }

  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Get All user who are all register
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUser = await User.find();

    res.status(200).json({
      staus: "Success",
      data: [getUser],
    });
  } catch (error) {
    res.status(400).json({
      staus: "failed",
      data: [],
      message: "Cannot Fetch All user",
    });
  }
});

// get user by Id
const getUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const getUserById = await User.findById(id);
    // res.json({ getUserById });
    res.status(200).json({
      staus: "Success",
      data: [getUserById],
    });
  } catch (error) {
    res.status(400).json({
      staus: "failed",
      data: [],
      message: "Check the Id , user Not register",
    });
  }
});

// Update the user By Id

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  const { email, firstName, lastName, mobile } = req?.body;
  try {
    const updateByUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        firstName,
        lastName,
        mobile,
      },
      {
        new: true,
      }
    );
    console.log("requser", updateByUser);
    res.status(200).json({
      staus: "Success",
      data: [updateByUser],
    });
    // res.json(updateByUser);
  } catch (error) {
    res.status(200).json({
      staus: "failed",
      data: [],
      messgae: "update is failed ",
    });
  }
});

// save Address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const updateByUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    console.log("requser", updateByUser);
    res.json(updateByUser);
  } catch (error) {
    res.status(200).json({
      staus: "failed",
      data: [],
      messgae: "update is failed ",
    });
  }
});

// Delete the user by Id
const deleteUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const deleteUserById = await User.findByIdAndDelete(id);
    res.json({ deleteUserById });
  } catch (error) {
    res.status(400).json({
      staus: "failed",
      data: [],
      message: "Check the Id , user Not register",
    });
  }
});

// block user by id
const isBlockedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({
      message: "user is blocked",
      user: block,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to block user",
      error: error.message,
    });
  }
});

// Unblock user by id
const isUnBlockedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({
      message: "user is Unblocked",
      user: unblock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unblock user",
      error: error.message,
    });
  }
});

// update password

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const password = req.body.password;
  validateMongoDBId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordtoken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi , Please follow this link to reset your Password.This link is valid till 10 minutes from now <a href="http://localhost:7000/api/reset-password/${token}">Click here</a> `;
    const data = {
      to: email,
      subject: "Forgot Password Link",
      text: "Hey User",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired,Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    let products = [];
    const findUser = await User.findById(_id);
    let alreadyExistcart = await Cart.findOne({ orderby: findUser._id });
    // if (alreadyExistcart) {
    //   await alreadyExistcart.remove(); // Use await here to ensure the remove operation completes before proceeding
    // }

    if (alreadyExistcart && typeof alreadyExistcart.remove === "function") {
      await alreadyExistcart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id)
        ?.select("price")
        .exec();
      object.price = getPrice?.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    // for (let i = 0; i < products.length; i++) {
    //   const price = parseFloat(products[i].price); // Ensure price is a valid number
    //   const count = parseInt(products[i].count); // Ensure count is a valid number
    //   if (!isNaN(price) && !isNaN(count)) {
    //     cartTotal += price * count;
    //   }
    // }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: findUser?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
// const deleteIdCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { id } = req.params;
//   validateMongoDBId(_id);
//   try {
//     const user = await User.findOne({ _id });
//     const cart = await Cart.findOneAndDelete({ orderby: id });
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const applyCoupon = asyncHandler(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   validateMongoDBId(_id);
//   const validCoupon = await Coupon.find({ name: coupon });
//   if (validCoupon === null) {
//     throw new Error("Coupon Invalid");
//   }
//   const user = await User.findOne({ _id });
//   let { cartTotal } = await Cart.findOne({
//     orderby: user?._id,
//   }).populate("products.product");
//   let totalAfterDiscount = (
//     cartTotal -
//     (cartTotal * validCoupon.discount) / 100
//   ).toFixed(2);
//   await Cart.findOneAndUpdate(
//     { orderby: user?._id },
//     { totalAfterDiscount },
//     { new: true }
//   );
//   res.json(totalAfterDiscount);
// });

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDBId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon }); // Use findOne to find a single document
  if (!validCoupon) {
    throw new Error("Coupon Invalid");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user?._id,
  }).populate("products.product");
  let totalAfterDiscount = cartTotal - (cartTotal * validCoupon.discount) / 100;
  // Ensure totalAfterDiscount is a Number, not a string
  totalAfterDiscount = parseFloat(totalAfterDiscount.toFixed(2));
  await Cart.findOneAndUpdate(
    { orderby: user?._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    if (!COD) throw new Error("Cash order Failed");
    const user = await User.findById(_id);
    const userCart = await Cart.findOne({ orderby: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quality: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ message: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDBId(_id);
  try {
    const userOrder = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .exec();
    res.json(userOrder);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrders = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  logout,
  getAllUser,
  getUserId,
  updateUser,
  deleteUserId,
  isBlockedUser,
  isUnBlockedUser,
  handleRefreshToken,
  updatePassword,
  forgotPasswordtoken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrders,
};
