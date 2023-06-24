const { body } = require('express-validator');

// Validate form register
const isRequiredRegister = [
  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'i')
    .withMessage(
      'Please enter a password at least 8 characters, at least one uppercase letter,one lowercase letter,one number and one special character'
    ),
  body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage('Email is not valid'),

  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .not()
    .isEmpty()
    .withMessage("The password doesn't match"),

  body('username').not().isEmpty().withMessage('Username cannot be blanked'),
];

const isRequiredLogin = [
  body('username').not().isEmpty().withMessage('Username cannot be blanked '),
  body('password').not().isEmpty().withMessage('Password cannot be blanked '),
];

const isRequiredForgotPassword = [
  body('email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage('Email is not valid'),
];

const isRequiredResetPassword = [
  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'i')
    .withMessage(
      'Please enter a password at least 8 characters, at least one uppercase letter,one lowercase letter,one number and one special character'
    ),
  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .not()
    .isEmpty()
    .withMessage("The password doesn't match"),
];
module.exports = {
  isRequiredRegister,
  isRequiredLogin,
  isRequiredForgotPassword,
  isRequiredResetPassword,
};
