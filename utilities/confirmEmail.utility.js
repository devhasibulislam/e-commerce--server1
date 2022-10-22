/**
 * Title: Confirmation token sender
 * Description: Send token through email to user throughout Nodemailer
 * Author: Hasibul Islam
 * Date: 22/10/2022
 */

/* external import */
const nodemailer = require("nodemailer");

function sendConfirmationEmail(userEmail, token, protocol, host, flag) {
  const transporter = nodemailer.createTransport({
    service: process.env.APP_SERVICE,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.APP_EMAIL,
    to: userEmail,
    subject: "Validation code to confirm registration",
    text: `Thank you for sign up.
    Please, confirm your account here: ${protocol}://${host}/user/${flag}?token=${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.name);
    } else {
      console.log("Email sent to: " + info.envelope.to[0]);
    }
  });
}

/* export confirmation email sender */
module.exports = sendConfirmationEmail;
