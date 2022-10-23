/**
 * Title: Supplier service
 * Description: Service that convey supplier controller
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* internal import */
const Supplier = require("../models/Supplier");

/* insert an user as supplier */
exports.insertAsSupplier = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

/* display all supplier */
exports.displayAllSupplier = async () => {
  const result = await Supplier.find();
  return result;
};

/* display specific supplier */
exports.displaySpecificSupplier = async (id) => {
  const result = await Supplier.findById(id).populate({
    path: "user",
    select: "fullName email contactNumber role status",
  });
  return result;
};

/* update specific supplier */
exports.updateSpecificSupplier = async (id, data) => {
  const result = await Supplier.findByIdAndUpdate(id, data);
  return result;
};
