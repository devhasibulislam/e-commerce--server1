/**
 * Title: Error handler
 * Description: A handler that represent all errors
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

function errorHandler(err, req, res, next) {
  res.status(500).json({
    acknowledgement: false,
    message: err.name,
    description: err.message,
  });
}

/* export handler */
module.exports = errorHandler;
