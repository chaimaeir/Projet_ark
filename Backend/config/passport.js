const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

passport.use(new OAuth2Strategy({
    authorizationURL: process.env.OAUTH_AUTHORIZATION_BASE_URL,
    tokenURL: process.env.OAUTH_TOKEN_URL,
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL,
    scope: ['email', 'profile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ oauthID: profile.id });
      if (!user) {
        const newUser = new User({
          oauthID: profile.id,
          displayName: profile.displayName,
        });
        await newUser.save();
        done(null, newUser);
      } else {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;