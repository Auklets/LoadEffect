const path = require('path');
const dockerController = require('../controllers/docker-controller');
const scenarioController = require('../controllers/scenario-controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.post('/api/get-scenarios', scenarioController.sendScenario);

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
    // res.status(404);
    // res.send('Page does not exist. <p><a href="/">Click here</a> to go back</p>');
  });
};
