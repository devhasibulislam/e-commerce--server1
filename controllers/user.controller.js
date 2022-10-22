/**
 * Title: User controller
 * Description: Control request, response and other middleware
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const bcrypt = require("bcryptjs");

/* internal imports */
const User = require("../models/User");
const sendConfirmationEmail = require("../utilities/confirmEmail.utility");
const { getToken } = require("../utilities/token.utility");

/* sign up an user */
exports.signUpAnUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.generateConfirmationToken();

    await user.save({ validateBeforeSave: false });
    sendConfirmationEmail(
      user.email,
      token,
      req.protocol,
      req.get("host"),
      "signup"
    );

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

/* confirm signed up user */
exports.confirmSignedUpUser = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ confirmationToken: token });
    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if (expired) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "The token provided by email is expired, retry",
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    res.status(200).json({
      acknowledgement: true,
      message: "Account activated",
      description: "Welcome to our website, you are ready to explore",
    });
  } catch (error) {
    next(error);
  }
};

/* sign in an user */
exports.signInAnUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        acknowledgement: false,
        message: "Not Found",
        description: "User not found",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(406).json({
        acknowledgement: false,
        message: "Not Acceptable",
        description: "Password won't match retry or forgot",
      });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "Account is not activated, verify first",
      });
    }

    const token = getToken(user);
    const { password: pw, ...others } = user.toObject();

    res.status(202).json({
      acknowledgement: true,
      message: "Accepted",
      description: "New user login complete",
      data: others,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/* retain a user after login based token expiry */
exports.getMe = async (req, res, next) => {
  try {
    const result = await User.findOne({ email: req.user.email });

    res.status(200).json({
      acknowledgement: true,
      message: "User retained",
      description: "User logged in already",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all users */
exports.displayAllUsers = async (req, res, next) => {
  try {
    const result = await User.find();

    res.status(200).json({
      acknowledgement: true,
      message: "Fetching complete",
      description: "Successfully fetch all users from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* reset password */
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = user.generateResetToken();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const result = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: hashedPassword } },
      { runValidators: true }
    );

    user.status = "inactive";

    await user.save({ validateBeforeSave: false });
    sendConfirmationEmail(
      user.email,
      token,
      req.protocol,
      req.get("host"),
      "forgot"
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Password reset",
      description: "Successfully reset password, from now use new one",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* confirm password reset */
exports.confirmPasswordReset = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ passwordResetToken: token });
    const expired = new Date() > new Date(user.passwordResetTokenExpires);

    if (expired) {
      return res.status(401).json({
        acknowledgement: false,
        message: "Unauthorized",
        description: "The token provided by email is expired, retry",
      });
    }

    user.status = "active";
    user.passwordChangedAt = Date.now();
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });

    res.status(200).json({
      acknowledgement: true,
      message: "Password reset",
      description: "Password reset now, try new",
    });
  } catch (error) {
    next(error);
  }
};
