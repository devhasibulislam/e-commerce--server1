/**
 * Title: Build category schema
 * Description: Schema that own category credentials to identify
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const mongoose = require("mongoose");

/* create category schema */
const categorySchema = mongoose.Schema(
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
        "https://www.insertcart.com/wp-content/uploads/2016/09/category.png",
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

/* create category model */
const Category = mongoose.model("Category", categorySchema);

/* export category */
module.exports = Category;
