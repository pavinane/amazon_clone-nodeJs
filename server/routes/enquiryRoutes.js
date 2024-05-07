const express = require("express");
const {
  createEnquiry,
  updateEnquiry,
  getEnquiry,
  deleteEnquiry,
  getidEnquiry,
} = require("../controller/enquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authToken");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.get("/", authMiddleware, isAdmin, getEnquiry);
router.get("/:id", authMiddleware, isAdmin, getidEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
