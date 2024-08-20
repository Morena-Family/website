const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'superliveId',
    passwordField: 'password'
  },
  async (superliveId, password, done) => {
    const user = await User.findOne({ superliveId });
    if (!user) return done(null, false, { message: 'User does not exist.' });
    if (password !== user.password) return done(null, false, { message: 'Incorrect password' });
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser( async(_id, done) => {
  const user = await User.findOne({ _id });
  done(null, user);
});

module.exports = passport;