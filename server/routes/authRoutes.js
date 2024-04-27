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
} = require("../controller/useController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/updatePassword", authMiddleware, updatePassword);
router.get("/refresh", handleRefreshToken);
router.get("/getalluser", authMiddleware, getAllUser);
router.get("/getuser/:id", authMiddleware, isAdmin, getUserId);
router.get("/logout", logout);

router.put("/edit-user", authMiddleware, updateUser);
router.delete("/deleteuser/:id", authMiddleware, deleteUserId);
router.put("/block/:id", authMiddleware, isAdmin, isBlockedUser);
router.put("/unblock/:id", authMiddleware, isAdmin, isUnBlockedUser);

module.exports = router;
