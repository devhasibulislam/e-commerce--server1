/**
 * Title: Category controller
 * Description: Controller for request, response and middlewares for methods
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* internal import */
const categoryService = require("../services/category.service");

/* create a new category */
exports.createNewCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createNewCategory(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New category created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific or all categories */
exports.displayAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.displayAllCategory(req.query);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching all categories from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
