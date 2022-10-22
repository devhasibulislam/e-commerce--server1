/**
 * Title: Category schema
 * Description: Schema based on exact product category
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const express = require("express");

/* internal imports */
const categoryController = require("../controllers/category.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */
router
  .route("/")
  .get(categoryController.displayAllCategory)
  .post(categoryController.createNewCategory);

/* export category router */
module.exports = router;
