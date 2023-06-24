const LocalStrategy = require('passport-local');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await User.findOne({ username: username });

          if (!user) {
            return done(null, false, req.flash('userFlash', 'User does not exist.'));
          }

          if (user) {
            const hash = await bcrypt.compare(password, user.password);
            if (hash) {
              return done(null, user);
            } else {
              return done(null, false, req.flash('passwordFlash', 'Invalid password.'));
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  }),
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
};
