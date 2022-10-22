/**
 * Title: Driver segment of this project
 * Description: All driver level task execute here
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal import */
const app = require("./app");
const { successMessage, errorMessage } = require("./utilities/message.utility");

/* database connection */
mongoose
  .connect(process.env.DB_LOCAL, {
    dbName: "ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => successMessage("Establish DB Connection"))
  .catch((error) => errorMessage(error.name));

/* establish server port */
app.listen(process.env.PORT, () => {
  successMessage(`App listening on Port :: ${process.env.PORT}`);
});
