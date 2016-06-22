const ctrlAuth = require('../controllers/auth-controller');

module.exports = (app) => {
  app.post('/api/login', ctrlAuth.login);
  app.post('/api/signup', ctrlAuth.signup);

  app.get('/api/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
  });
};
