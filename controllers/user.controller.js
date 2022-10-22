/**
 * Title: User controller
 * Description: Control request, response and other middleware
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* internal imports */
const User = require("../models/User");
const sendConfirmationEmail = require("../utilities/confirmEmail.utility");

/* sign up an user */
exports.signUpAnUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.generateConfirmationToken();

    await user.save({ validateBeforeSave: false });
    sendConfirmationEmail(user.email, token, req.protocol, req.get("host"));

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New user registration complete",
      data: {
        name: user.fullName,
        email: user.email,
        phone: user.contactNumber,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* sign in an user */
exports.signInAnUser = async (req, res, next) => {
  try {
    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "New user login complete",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
