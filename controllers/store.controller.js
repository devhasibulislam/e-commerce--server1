/**
 * Title: Store controller
 * Description: Controller for request, response and middlewares for methods
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

const storeService = require("../services/store.service");

/* internal import */

/* create new store */
exports.createNewStore = async (req, res, next) => {
  try {
    const result = await storeService.createNewStore(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "New store created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all stores */
exports.displayAllStores = async (req, res, next) => {
  try {
    const result = await storeService.displayAllStores();

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetched all stores from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific store */
exports.displaySpecificStore = async (req, res, next) => {
  try {
    const result = await storeService.displaySpecificStore(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching specific store from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
