/**
 * Title: Build supplier schema
 * Description: Schema that own supplier credentials to identify
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external import */
const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

/* create supplier schema */
const supplierSchema = mongoose.Schema(
  {
    // info form user DB
    user: {
      type: ObjectId,
      required: [true, "Please, select your profile"],
      ref: "User",
    },

    // for brand
    brand: {
      name: String,
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },

    // for trade license number
    tradeLicenseNumber: {
      type: Number,
      required: [true, "Please, provide your trade license number"],
    },

    // for location or address
    location: {
      type: String,
      required: [true, "Please, provide your location or address"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [200, "Name would be less than 100 characters"],
    },

    // for NID card image
    nidPhoto: {
      type: String,
      required: [true, "Please, provide your NID photo"],
      unique: true,
    },

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

/* create supplier model */
const Supplier = mongoose.model("Supplier", supplierSchema);

/* export supplier */
module.exports = Supplier;
