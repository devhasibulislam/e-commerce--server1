/**
 * Title: Category service
 * Description: All services that pass from controller execute here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const Category = require("../models/Category");

/* create a new category */
exports.createNewCategory = async (data) => {
  const result = await Category.create(data);
  return result;
};

/* display specific or all categories */
exports.displayAllCategory = async (query) => {
  const result = await Category.find(query);
  return result;
};
