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

/* router level connection */
const router = express.Router();

/* router methods integration */
router.post("/signup", userController.signUpAnUser);
router.post("/signin", userController.signInAnUser);

/* export user router */
module.exports = router;