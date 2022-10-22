/**
 * Title: Build store schema
 * Description: Schema that own store credentials to identify
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

/* create category schema */
const storeSchema = mongoose.Schema(
  {
    // for name
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a category name"],
      lowercase: true,
      unique: true,
    },

    // for description
    description: {
      type: String,
      trim: true,
      minLength: [50, "Description won't be less than 50 characters"],
      maxLength: [500, "Description won't be more than 500 characters"],
    },

    // for thumbnail
    thumbnail: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20190604/original/pngtree-store-ceiling-png-image_1044193.jpg",
    },

    // for status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // for manager
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
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
  { timestamps: true }
);

/* create store model */
const Store = mongoose.model("Store", storeSchema);

/* export store */
module.exports = Store;
