const passport = require('passport');
const User = require('../models/UsersModel');

// Helper function to send JSON response
const sendJSON = function sendJSON(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.signup = function signup(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = user.setPassword(req.body.password);

  user.save(function(err) {
    let token;

    if (err) {
      sendJSON(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSON(res, 200, {
        id_token: token,
      });
    }
  });
};

module.exports.login = function login(req, res, next) {
  if (!req.body.email || !req.body.password) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  passport.authenticate('local', function(err, user, info) {

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
