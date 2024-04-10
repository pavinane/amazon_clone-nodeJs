const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_DB);
    console.log("database connect successfully");
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = dbConnect;
