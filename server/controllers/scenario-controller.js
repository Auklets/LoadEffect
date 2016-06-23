const Scenario = require('../models/ScenariosModel');
const utils = require('../lib/utils');

const sendJSON = utils.sendJSON;

module.exports.createScenario = (req, res) => {
  const scenarioObj = {
    scenarioName: req.body.scenarioName,
    spawnsCount: req.body.spawnCount,
    spawnRate: req.body.spawnRate,
    targetURL: req.body.targetURL,
    script: req.body.script,
    averageResponseTime: 0,
    averageActionTime: 0,
    id_user: 1, // Fake user ID, how do you attach user id here?
  };

  if (!scenarioObj.scenarioName || !scenarioObj.runsCount || !scenarioObj.targetURL) {
    sendJSON(res, 400, {
      message: 'All fields required',
    });
    return;
  }

  const newScenario = new Scenario(scenarioObj);
  newScenario.save()
    .then(() => {
      sendJSON(res, 201, {
        message: 'Success! New scenario has been saved',
      });
    })
    .catch(err => {
      sendJSON(res, 400, err);
    });
  // Do some kind of post request here to worker?
};

module.exports.getAvgResponseTime = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user.id })
    .fetch()
    .then(scenario => {
      sendJSON(res, 200, {
        averageResponseTime: scenario.get('averageResponseTime'),
      });
    })
    .catch(err => {
      sendJSON(res, 404, err);
    });
};

module.exports.getAvgActionTime = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user.id })
    .fetch()
    .then(scenario => {
      sendJSON(res, 200, {
        averageActionTime: scenario.get('averageActionTime'),
      });
    })
    .catch(err => {
      sendJSON(res, 404, err);
    });
};

module.exports.deleteScenario = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user.id })
    .destroy()
    .then(() => {
      sendJSON(res, 200, {
        message: 'Success! Scenario has been removed',
      });
    });
};
