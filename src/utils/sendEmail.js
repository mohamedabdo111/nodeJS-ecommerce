const nodemailer = require("nodemailer");
const SendEmail = async (email, subject, message) => {
  console.log(
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD,
    "email and password",
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // The 16-character App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return Promise.reject({
      message: "Failed to send email",
      statusCode: 500,
    });
  }
};

module.exports = SendEmail;
