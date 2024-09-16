const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./Router/userRoutes");

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use("/api", userRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(
      process.env.PORT,
      console.log(`server running on PORT ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
