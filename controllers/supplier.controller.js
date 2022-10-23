/**
 * Title: Supplier controller
 * Description: Controller that control request, response and handle middleware
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* internal import */
const supplierService = require("../services/supplier.service");

/* insert an user as supplier */
exports.insertAsSupplier = async (req, res, next) => {
  try {
    const result = await supplierService.insertAsSupplier(req.body);

    res.status(201).json({
      acknowledgement: true,
      message: "Created",
      description: "Created as supplier",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display all supplier */
exports.displayAllSupplier = async (req, res, next) => {
  try {
    const result = await supplierService.displayAllSupplier();

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching all supplier from DB",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* display specific supplier */
exports.displaySpecificSupplier = async (req, res, next) => {
  try {
    const result = await supplierService.displaySpecificSupplier(req.params.id);

    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "Fetching specific supplier done",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* update specific supplier */
exports.updateSpecificSupplier = async (req, res, next) => {
  try {
    const result = await supplierService.updateSpecificSupplier(
      req.params.id,
      req.body
    );

    res.status(202).json({
      acknowledgement: true,
      message: "Accepter",
      description: "Specific supplier modified",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
