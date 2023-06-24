const passport = require('passport');

const GithubLoginPage = passport.authenticate('github', {
  scope: ['user:email'],
});

const exchangeGithubUserInfo = passport.authenticate('github');

const GithubRedirect = (req, res) => {
  res.redirect('/auth/secret');
};

module.exports = {
  GithubLoginPage,
  GithubRedirect,
  exchangeGithubUserInfo,
};
