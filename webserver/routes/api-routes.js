const path = require('path');
const scenarioController = require('../controllers/scenario-controller');
// const resultsController = require('../controllers/results-controller');
const jwt = require('express-jwt');
const auth = jwt({ secret: process.env.JWT_SECRET });

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
  });

  app.post('/api/scenarios', auth, scenarioController.createScenario);
  app.get('/api/scenarios', auth, scenarioController.getScenarios);
  app.post('/api/run-scenario', auth, scenarioController.runScenarioTest);

  app.post('/api/validate-website', auth, scenarioController.validateWebsite);

   // Catch all;
  app.get('/*', (req, res) => {
    res.redirect('/');
    // res.status(404);
    // res.send('Page does not exist. <p><a href="/">Click here</a> to go back</p>');
  });
};
