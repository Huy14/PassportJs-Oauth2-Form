const { validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/sendEmail');
const flashMessages = require('./../utils/flashMessage');
const User = require('./../model/userModel');

// Salt round
const saltRound = 15;

// Authenticate User
const authenticate = passport.authenticate('local', {
  failureRedirect: '/auth/login',
  failureFlash: true,
});

// Redirect Page
const redirect = function (req, res) {
  res.redirect('/auth/secret');
};

// Error Display
const errorDisplay = (paramReq, paramRes, paramNext, page, option) => {
  const err = validationResult(paramReq);
  if (err.errors.length > 0) {
    switch (option) {
      case 'full':
        paramRes.render(page, {
          alert: err.mapped(),
          username: paramReq.body.username,
          email: paramReq.body.email,
        });
        break;
      case 'email':
        paramRes.render(page, {
          alert: err.mapped(),
          email: paramReq.body.email,
        });
        break;
      case 'username':
        paramRes.render(page, {
          alert: err.mapped(),
          username: paramReq.body.username,
        });
        break;
      default:
        paramRes.render(page, {
          alert: err.mapped(),
        });
        break;
    }
  } else {
    paramNext();
  }
};

// Check user authenticated
const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

// User logout
const userLogOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
};

/*----------------------------LOGIN PAGE----------------------------------------*/
const LoginPage = (req, res) => {
  const messages = flashMessages(req);
  res.render('login', {
    messages: messages,
  });
};

const userLogInValidation = (req, res, next) => {
  errorDisplay(req, res, next, 'login', 'username');
};

/*----------------------------REGISTER PAGE----------------------------------------*/
const RegisterPage = (req, res) => {
  res.render('register', {
    error: req.flash('registerFlash'),
  });
};

const userRegisterValidation = (req, res, next) => {
  errorDisplay(req, res, next, 'register', 'full');
};

const createUser = async (req, res, next) => {
  try {
    const existUser = await User.findOne({
      email: req.body.email,
    });

    if (existUser) {
      req.flash('registerFlash', 'User is already existed.');
      res.redirect('/auth/register');
    } else {
      const hash = await bcrypt.hash(req.body.password, saltRound);
      const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: hash,
      });

      req.flash('createUserFlash', 'Successfully created new user.');
      res.redirect('/auth/login');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error.message,
    });
  }

  next();
};

/*----------------------------SECRET PAGE----------------------------------------*/
const SecretPage = (req, res) => {
  res.render('secret', {
    username: req.user.username,
  });
};

/*----------------------------FORGOT PASSWORD PAGE----------------------------------------*/
const ForgotPasswordPage = (req, res) => {
  res.render('forgot-password', {
    forgotPasswordFlash1: req.flash('forgotPasswordFlash1'),
  });
};

const forgotPasswordValidation = (req, res, next) => {
  errorDisplay(req, res, next, 'forgot-password', 'email');
};

const forgotPasswordRequest = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash('forgotPasswordFlash1', 'User not found!!!');
      res.redirect('/auth/forgot-password');
    } else {
      const secret = process.env.JWT_SECRET + user.password;
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: '10m' });
      const link = `http://localhost:3000/auth/reset-password/${user._id}/${token}`;

      /* Send email to current user in order to change their password */
      sendEmail(user.email, user._id, token);

      req.flash(
        'forgotPasswordFlash2',
        'A request has been sent to your email, please check your email.'
      );

      res.redirect('/auth/login');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

/*----------------------------RESET PASSWORD PAGE----------------------------------------*/
const ResetPasswordPage = async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      res.status(404).json({
        status: 'Failed',
        message: 'Invalid user Id',
      });
    } else {
      const secret = process.env.JWT_SECRET + user.password;
      const payload = jwt.verify(token, secret);
      res.render('reset-password', { email: user.email });
    }
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

const resetPasswordValidation = (req, res, next) => {
  errorDisplay(req, res, next, 'reset-password');
};

const resetPasswordRequest = async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      req.flash('resetPasswordFlash1', 'User not found!!!');

      res.redirect('/auth/forgot-password');
    }

    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);

    if (payload) {
      const hash = await bcrypt.hash(req.body.passwordConfirmation, saltRound);

      const filter = { _id: id };
      const update = { password: hash };
      await User.findOneAndUpdate(filter, update);

      req.flash('resetPasswordFlash2', 'Successfully changed password.');
      res.redirect('/auth/login');
    }
  } catch (error) {
    res.status(404).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

const formValidation = {
  userLogInValidation,
  userRegisterValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
};

const userAuthenticate = {
  authenticate,
  redirect,
  authCheck,
  createUser,
  userLogOut,
};

const formPage = {
  LoginPage,
  RegisterPage,
  SecretPage,
  ForgotPasswordPage,
  ResetPasswordPage,
};

const formRequest = {
  resetPasswordRequest,
  forgotPasswordRequest,
};

module.exports = {
  formValidation,
  userAuthenticate,
  formPage,
  formRequest,
};
