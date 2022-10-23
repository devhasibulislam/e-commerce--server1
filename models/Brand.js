/**
 * Title: Brand schema
 * Description: Schema that convey all brand credentials
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external import */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create brand schema */
const brandSchema = mongoose.Schema(
  {
    // for products
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    // for name
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name"],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    // for description
    description: {
      type: String,
      trim: true,
      minLength: [50, "Description won't be less than 50 characters"],
      maxLength: [500, "Description won't be more than 500 characters"],
    },

    // for email
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    // for website
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },

    // for location or address
    location: {
      type: String,
      required: [true, "Please, provide your location or address"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [200, "Name would be less than 100 characters"],
    },

    // for supplier
    suppliers: [
      {
        type: ObjectId,
        ref: "Supplier",
      },
    ],

    // for status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

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
  {
    timestamps: true,
  }
);

/* create brand model */
const Brand = mongoose.model("Brand", brandSchema);

/* export brand */
module.exports = Brand;
