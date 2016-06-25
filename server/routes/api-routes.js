const path = require('path');
const dockerController = require('../controllers/docker-controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.post('/api/docker', dockerController.createWorker);

  app.get('/api/docker', dockerController.checkWorker);

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
    // res.status(404);
    // res.send('Page does not exist. <p><a href="/">Click here</a> to go back</p>');
  });
};
