const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
  });
};
