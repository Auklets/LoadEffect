const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UsersModel');

const fields = { usernameField: 'email', passwordField: 'password' };

const verifyCredentials = function verifyCredentials(username, password, done) {
  User.findOne({ email: username }, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user || !user.validPassword(password)) {
      return done(null, false, {
        message: 'Invalid credentials',
      });
    }

    return done(null, user);
  });
};

module.exports = function(app, passport) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(fields, verifyCredentials));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.where('id', id).fetch().then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      console.error(err);
    });
  });
};
