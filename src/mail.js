const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'srmorm',
  subject: 'Email de teste',
  text: 'Teste',
};

console.log(process.env.EMAIL_USER);

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
