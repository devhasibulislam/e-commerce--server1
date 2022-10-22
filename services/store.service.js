/**
 * Title: Store service
 * Description: All services that pass from controller execute here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* internal import */
const Store = require("../models/Store");

/* create a new store */
exports.createNewStore = async (data) => {
  const result = await Store.create(data);
  return result;
};

/* display all stores */
exports.displayAllStores = async () => {
  const result = await Store.find();
  return result;
};

/* display specific store */
exports.displaySpecificStore = async (id) => {
  const result = await Store.findById(id).populate({
    path: "manager.id",
    select: "fullName email contactNumber role status"
  });
  return result;
};
