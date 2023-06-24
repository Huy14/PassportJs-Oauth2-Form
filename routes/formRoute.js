const {
  isRequiredLogin,
  isRequiredRegister,
  isRequiredForgotPassword,
  isRequiredResetPassword,
} = require('./../utils/validation');
const passport = require('passport');

const {
  formValidation,
  userAuthenticate,
  formPage,
  formRequest,
} = require('../controller/formController');

const router = require('express').Router();

router
  .route('/login')
  .get(formPage.LoginPage)
  .post(
    isRequiredLogin,
    formValidation.userLogInValidation,
    userAuthenticate.authenticate,
    userAuthenticate.redirect
  );

router
  .route('/register')
  .get(formPage.RegisterPage)
  .post(
    isRequiredRegister,
    formValidation.userRegisterValidation,
    userAuthenticate.createUser
  );

router
  .route('/forgot-password')
  .get(formPage.ForgotPasswordPage)
  .post(
    isRequiredForgotPassword,
    formValidation.forgotPasswordValidation,
    formRequest.forgotPasswordRequest
  );

router
  .route('/reset-password/:id/:token')
  .get(formPage.ResetPasswordPage)
  .post(
    isRequiredResetPassword,
    formValidation.resetPasswordValidation,
    formRequest.resetPasswordRequest
  );

router.route('/secret').get(userAuthenticate.authCheck, formPage.SecretPage);
router.route('/logout').get(userAuthenticate.userLogOut);

module.exports = router;
