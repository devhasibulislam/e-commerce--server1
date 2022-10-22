/**
 * Title: Colored messages
 * Description: Display messages with proper colors
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const colors = require("colors");

exports.successMessage = (message) => {
  console.log(colors.green.bold.italic(`Success: ${message}`));
};

exports.errorMessage = (message) => {
  console.log(colors.red.bold.italic(`Error: ${message}`));
};
