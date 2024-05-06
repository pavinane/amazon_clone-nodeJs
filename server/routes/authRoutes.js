const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAllUser,
  getUserId,
  deleteUserId,
  updateUser,
  isUnBlockedUser,
  isBlockedUser,
  handleRefreshToken,
  logout,
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
} = require("../controller/useController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.put("/updatePassword", authMiddleware, updatePassword);
router.put("/forgot-password-token", forgotPasswordtoken);
router.put("/reset-password/:token", resetPassword);
router.get("/refresh", handleRefreshToken);
router.get("/getalluser", authMiddleware, getAllUser);
router.get("/getuser/:id", authMiddleware, isAdmin, getUserId);
router.get("/wishlist", authMiddleware, getWishList);
router.put("/save-address", authMiddleware, saveAddress);
router.post("/user-cart", authMiddleware, userCart);
router.get("/user-cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/logout", logout);
router.put("/edit-user", authMiddleware, updateUser);
router.delete("/deleteuser/:id", authMiddleware, deleteUserId);
router.put("/block/:id", authMiddleware, isAdmin, isBlockedUser);
router.put("/unblock/:id", authMiddleware, isAdmin, isUnBlockedUser);

module.exports = router;
