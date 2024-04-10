const jwt = require("jsonwebtoken");

const generateRefereshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3day" });
};

module.exports = { generateRefereshToken };
