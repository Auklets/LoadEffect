const passport = require('passport');
const User = require('../models/UsersModel');

// Helper function to send JSON response
const sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.signup = (req, res) => {
  let token;

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
    .then(user => {
      if (!user) {
        const newUser = new User(userObj);
        newUser.setPassword(req.body.password);
        newUser.save();
        token = newUser.generateJwt();
        return newUser;
      }
    })
    .then(() => {
      sendJSON(res, 200, {
        id_token: token,
      });
    })
    .catch(err => {
      sendJSON(res, 404, err);
    });
};

module.exports.login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    let token;

    if (err) {
      sendJSON(res, 404, err);
      return;
    }
    if (user) {
      token = user.generateJwt();
      sendJSON(res, 200, {
        id_token: token,
      });
    } else {
      sendJSON(res, 401, info);
    }
  })(req, res, next);
};
