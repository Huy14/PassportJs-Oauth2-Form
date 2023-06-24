const {
  GoogleLoginPage,
  GoogleRedirect,
  exchangeGoogleUserInfo,
} = require('../controller/googleOauthController');

const router = require('express').Router();

router.route('/').get(GoogleLoginPage);
router.route('/redirect').get(exchangeGoogleUserInfo, GoogleRedirect);

module.exports = router;
