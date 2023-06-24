const GithubStrategy = require('passport-github2');
const GithubUser = require('../model/githubUserModel');

module.exports = (passport) => {
  passport.use(
    new GithubStrategy(
      {
        // Options
        callbackURL: '/auth/github/callback',
        clientID: process.env.CLIENT_GIT_ID,
        clientSecret: process.env.CLIENT_GIT_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        // Passport callback
        try {
          const user = await GithubUser.findOne({ githubID: profile.id });
          if (user) {
            console.log('Github user found!!!');
            done(null, user);
          } else {
            const newUser = await GithubUser.create({
              githubID: profile.id,
              username: profile.username,
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
