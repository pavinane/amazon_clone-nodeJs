const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dbConnect();
const PORT = process.env.PORT || 7000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api/product", productRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server lunched successfully ${PORT}`);
});
