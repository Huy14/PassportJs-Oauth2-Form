const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./utils/rootDir');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash');

const app = express();

// Middlewares
app.use(flash());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));
app.set('view engine', 'ejs');
dotenv.config({ path: 'config.env' });

// Passport Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Setup
require('./config/passport-google-setup')(passport);
require('./config/passport-setup')(passport);
require('./config/passport-github-setup')(passport);

// Route
const githubOauthRoute = require('./routes/githubOauthRoute');
const googleOauthRoute = require('./routes/googleOauthRoute');
const formRoute = require('./routes/formRoute');

app.use('/auth', formRoute);
app.use('/auth/google', googleOauthRoute);
app.use('/auth/github', githubOauthRoute);

module.exports = app;
