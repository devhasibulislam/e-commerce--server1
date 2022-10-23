/**
 * Title: Supplier route
 * Description: All supplier credentials convey here
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external import */
const express = require("express");

/* internal import */
const supplierController = require("../controllers/supplier.controller");

/* router level connection */
const router = express.Router();

/* router methods integration */
router
  .route("/")
  .get(supplierController.displayAllSupplier)
  .post(supplierController.insertAsSupplier);
router
  .route("/:id")
  .get(supplierController.displaySpecificSupplier)
  .patch(supplierController.updateSpecificSupplier);

/* export supplier router */
module.exports = router;
