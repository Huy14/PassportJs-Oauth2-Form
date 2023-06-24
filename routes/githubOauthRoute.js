const {
  GithubLoginPage,
  GithubRedirect,
  exchangeGithubUserInfo,
} = require('../controller/githubOauthController');

const router = require('express').Router();

router.route('/').get(GithubLoginPage);
router.route('/callback').get(exchangeGithubUserInfo, GithubRedirect);

module.exports = router;
