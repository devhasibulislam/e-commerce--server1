/**
 * Title: Upload product thumbnail
 * Description: Create a middleware based on thumbnail upload for each product
 * Author: Hasibul Islam
 * Date: 09/10/2022
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/products/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const productThumbnailUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpeg|jpg|webp/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg/webp formate"));
    }
  },
  limits: {
    fileSize: 1000000, // >= 1mb
  },
});

module.exports = productThumbnailUpload;
