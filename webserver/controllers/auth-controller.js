const passport = require('passport');
const User = require('../models/UsersModel');
const utils = require('../lib/utils');

const sendJSON = utils.sendJSON;

const signup = (req, res) => {
  let token;
  let userId;

  const userObj = {
    name: req.body.name,
    email: req.body.email,
  };

  if (!userObj.name || !userObj.email || !req.body.password) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  User.where('email', userObj.email).fetch()
    .then(existingUser => {
      if (!existingUser) {
        const newUser = new User(userObj);
        newUser.setPassword(req.body.password);
        newUser.save();
        token = newUser.generateJwt();
        return newUser;
      }
    })
    .then(() => {
      User.where('email', userObj.email).fetch()
        .then(user => {
          userId = user.get('id');
          sendJSON(res, 200, {
            id_token: token,
            id_user: userId,
          });
        });
    })
    .catch(err => {
      sendJSON(res, 404, err);
    });
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    let token;
    let userId;
    if (err) {
      sendJSON(res, 404, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      console.log(user);
      userId = user.get('id');
      sendJSON(res, 200, {
        id_token: token,
        id_user: userId,
      });
    } else {
      sendJSON(res, 401, info);
    }
  })(req, res, next);
};

module.exports = { signup, login };
