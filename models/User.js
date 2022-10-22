/**
 * Title: Build user schema
 * Description: Schema that own user credentials to identify
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");

/* internal import */
const { successMessage } = require("../utilities/message.utility");

/* create user schema */
const userSchema = mongoose.Schema(
  {
    // for name
    fullName: {
      type: String,
      required: [true, "Please, provide full name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name would be at most 100 characters"],
    },

    // for email
    email: {
      type: String,
      required: [true, "Please, provide an email address"],
      validate: [validator.isEmail, "Please, provide valid an email address"],
      unique: [true, "This email exists in our DB, provide a new"],
    },

    // for password
    password: {
      type: String,
      required: [true, "Please, provide strong password"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough, retry",
      },
    },

    // for confirm password
    confirmPassword: {
      type: String,
      required: [true, "Please, retype password to confirm"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords won't match, retry",
      },
    },

    // for avatar
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/564x/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.jpg",
    },

    // for contact number
    contactNumber: {
      type: String,
      required: [true, "Please, provide valid phone number"],
      validate: {
        validator: (value) =>
          validator.isMobilePhone(value, "bn-BD", { strictMode: true }),
        message: "Phone number {VALUE} is not valid",
      },
    },

    // for role
    /**
     * admin: contains full control
     * buyer: sell to seller
     * seller: buy from buyer
     * deliverer: deliver to seller
     * supplier: supply to buyer
     */
    role: {
      type: String,
      enum: ["admin", "buyer", "seller", "deliverer", "supplier"],
      default: "seller",
    },

    // for status
    /**
     * active: verify account
     * inactive: not verify account
     * blocked: account deleted
     */
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "inactive",
    },

    // for shipping address
    shippingAddress: {
      type: String,
      trim: true,
      minLength: [5, "Shipping address must be at least 5 characters"],
      maxLength: [200, "Shipping address would be at most 200 characters"],
    },

    // for confirmation token
    confirmationToken: String,
    confirmationTokenExpires: Date,

    // for password reset
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,

    // for time stamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* middlewares to encrypt password */
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    this.confirmPassword = undefined;
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (next) {
  try {
    successMessage("Password encryption successful");
  } catch (error) {
    next(error);
  }
});

/* compare passwords as sign in proportion */
userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

/* generate new user confirmation token */
userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(16).toString("hex");

  this.confirmationToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

/* generate new password reset token */
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(8).toString("hex");

  this.passwordResetToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.passwordResetTokenExpires = date;

  return token;
};

/* create user model */
const User = mongoose.model("User", userSchema);

/* export user */
module.exports = User;
