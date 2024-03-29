/**
 * Title: Initial segment of this project
 * Description: All application level tasks execute here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external imports */
const express = require("express");
const cors = require("cors");

/* internal imports */
const errorHandler = require("./middlewares/error.middleware");

/* router level imports */
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");
const supplierRoute = require("./routes/supplier.route");
const brandRoute = require("./routes/brand.route");

/* application level connections */
const app = express();

/* middlewares connections */
app.use(cors());
app.use(express.json());

/* router level connections */
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/store", storeRoute);
app.use("/supplier", supplierRoute);
app.use("/brand", brandRoute);

/* global error handlers */
app.use(errorHandler);

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "Establishing server connection complete",
      description:
        "The request is processing well & returning success message E-Commerce project",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: error.name,
      description: error.message,
    });
  }
});

/* export application */
module.exports = app;
