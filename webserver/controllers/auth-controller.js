const passport = require('passport');
const User = require('../models/UsersModel');
const utils = require('../lib/utils');

const sendJSON = utils.sendJSON;

const signup = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  User.where('email', req.body.email).fetch()
    .then(existingUser => {
      if (!existingUser) {
        const newUser = new User({ name: req.body.name, email: req.body.email });
        newUser.setPassword(req.body.password);
        newUser.save()
        .then(() => {
          sendJSON(res, 200, { id_token: newUser.generateJwt() });
        });

        return newUser;
      }
    })
    .catch(err => sendJSON(res, 404, err));
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return sendJSON(res, 404, err);
    }

    if (user) {
      sendJSON(res, 200, { id_token: user.generateJwt() });
    } else {
      sendJSON(res, 401, info);
    }
  })(req, res, next);
};

module.exports = { signup, login };
