const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UsersModel');

const fields = { usernameField: 'email', passwordField: 'password' };

const verifyCredentials = (email, password, done) => {
  User.where('email', email).fetch()
    .then(user => {
      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Invalid credentials',
        });
      }
      return done(null, user);
    })
    .catch(err => {
      done(err);
    });
};

module.exports = (app, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(fields, verifyCredentials));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.where('id', id).fetch().then(user => {
      done(null, user);
    })
    .catch(err => {
      console.error(err);
    });
  });
};
