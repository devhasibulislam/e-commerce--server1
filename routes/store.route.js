/**
 * Title: Store route
 * Description: All store credentials convey here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const express = require("express");
const storeController = require("../controllers/store.controller");

/* internal imports */

/* router level connection */
const router = express.Router();

/* router methods integration */
router
  .route("/")
  .get(storeController.displayAllStores)
  .post(storeController.createNewStore);
router.get("/:id", storeController.displaySpecificStore);

/* export category router */
module.exports = router;
