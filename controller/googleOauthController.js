const passport = require('passport');

const GoogleLoginPage = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

const exchangeGoogleUserInfo = passport.authenticate('google');

const GoogleRedirect = (req, res) => {
  res.redirect('/auth/secret');
};

module.exports = {
  GoogleLoginPage,
  GoogleRedirect,
  exchangeGoogleUserInfo,
};
