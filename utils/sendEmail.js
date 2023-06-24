const nodemailer = require('nodemailer');

const sendEmail = async (link, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Reset Password Link - PassportJs-Oauth2-Form',
      html: `<p>You requested for reset password, kindly use this <a href="${link}>Link</a> to reset your password</p>`,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendEmail;
