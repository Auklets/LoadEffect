const authController = require('../controllers/auth-controller');

module.exports = (app) => {
  app.post('/api/login', authController.login);
  app.post('/api/signup', authController.signup);

  app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
};
