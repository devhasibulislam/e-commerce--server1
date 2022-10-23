/**
 * Title: Brand route
 * Description: All brand credentials convey here
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external import */
const express = require("express");
const brandController = require("../controllers/brand.controller");

/* internal imports */

/* router level connection */
const router = express.Router();

/* router methods integration */
router
  .route("/")
  .post(brandController.createBrand)
  .get(brandController.getBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrand);

/* export brand */
module.exports = router;
