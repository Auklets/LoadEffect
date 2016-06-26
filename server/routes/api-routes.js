const path = require('path');
const scenarioController = require('../controllers/scenario-controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.post('/api/scenarios', scenarioController.createScenario);
  app.get('/api/scenarios', scenarioController.getScenarios);

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
    // res.status(404);
    // res.send('Page does not exist. <p><a href="/">Click here</a> to go back</p>');
  });
};
