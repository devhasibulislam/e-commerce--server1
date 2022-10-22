/**
 * Title: User authenticate credentials
 * Description: All user credential convey from here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const express = require("express");

/* internal import */
const userController = require("../controllers/user.controller");
const authorizationMiddleware = require("../middlewares/authorization.middleware");
const verifyTokenMiddleware = require("../middlewares/verifyToken.middleware");

/* router level connection */
const router = express.Router();

/* router methods integration */
router
  .route("/signup")
  .get(userController.confirmSignedUpUser)
  .post(userController.signUpAnUser);
router.post("/signin", userController.signInAnUser);
router.get("/me", verifyTokenMiddleware, userController.getMe);
router.get(
  "/all",
  verifyTokenMiddleware,
  authorizationMiddleware("admin"),
  userController.displayAllUsers
);

/* export user router */
module.exports = router;
