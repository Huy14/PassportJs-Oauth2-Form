const GoogleStrategy = require('passport-google-oauth20');
const GoogleUser = require('../model/googleUserModel');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        // Options
        callbackURL: '/auth/google/redirect',
        clientID: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        // Passport callback
        try {
          const user = await GoogleUser.findOne({ googleID: profile.id });
          if (user) {
            console.log('Google user found!!!');
            done(null, user);
          } else {
            const newUser = await GoogleUser.create({
              googleID: profile.id,
              username: profile.displayName,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.log(error.message);
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
