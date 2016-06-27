const Scenario = require('../models/ScenariosModel');
const dockerController = require('./docker-controller');
const utils = require('../lib/utils');
const request = require('request');

const sendJSON = utils.sendJSON;

const createScenario = (req, res) => {
  console.log('createScenario called');

  const data = {
    scenarioName: req.body.scenarioName,
    spawnsCount: req.body.spawnsCount,
    workers: req.body.workers,
    targetURL: req.body.targetURL,
    script: req.body.script,
    id_user: req.user._id,
  };

  if (!data.scenarioName || !data.spawnsCount || !data.targetURL) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  // create Master to execute new scenario
  dockerController.createMaster(req, res);

  // request.post({
  //   url: 'http://localhost:3000/go', // Change this endpoint to master server api
  //   method: 'POST',
  //   json: true,
  //   body: data,
  // });

  const newScenario = new Scenario(data);
  newScenario.save()
    .then(() => {
      sendJSON(res, 201, { message: 'New scenario has been saved!' });
    })
    .catch(err => sendJSON(res, 400, err));
};

const getAvgResponseTime = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user._id })
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

const getAvgActionTime = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user })
    .fetch()
    .then(scenario => {
      sendJSON(res, 200, {
        averageActionTime: scenario.get('averageActionTime'),
      });
    })
    .catch(err => sendJSON(res, 404, err));
};

const deleteScenario = (req, res) => {
  Scenario.where({ scenarioName: req.body.scenarioName, id_user: req.user._id })
    .destroy()
    .then(() => {
      sendJSON(res, 200, { message: 'Scenario has been removed!' });
    });
};

const getScenarios = (req, res) => {
  Scenario.where({ id_user: req.user._id })
    .fetchAll()
    .then(data => {
      sendJSON(res, 200, JSON.stringify(data.models));
    });
};

module.exports = { getScenarios, createScenario, getAvgResponseTime, getAvgActionTime, deleteScenario };
