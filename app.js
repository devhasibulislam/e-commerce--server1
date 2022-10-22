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

/* application level connections */
const app = express();

/* middlewares connections */
app.use(cors());
app.use(express.json());

/* router level connections */

/* global error handlers */
app.use(errorHandler);

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: "No Content",
      description:
        "The request has been successfully processed, but is not returning any content",
    });
  }
});

/* export application */
module.exports = app;
