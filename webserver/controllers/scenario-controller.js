const Scenario = require('../models/ScenariosModel');
const utils = require('../lib/utils');

const sendJSON = utils.sendJSON;

const createScenario = (req, res) => {
  const data = {
    scenarioName: req.body.scenarioName,
    spawnsCount: +req.body.spawnsCount,
    workers: +req.body.workers,
    targetURL: req.body.targetURL,
    script: req.body.script,
    isVerifiedOwner: false,
    id_user: req.user._id,
    completion: false,
  };

  if (!data.scenarioName || !data.spawnsCount || !data.targetURL) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  const newScenario = new Scenario(data);
  newScenario.save()
    .then(() => {
      data.scenarioID = newScenario.get('id');

      data.message = 'New scenario has been saved!';
      sendJSON(res, 201, data);
    })
    .catch(err => sendJSON(res, 400, err));
};

const runScenarioTest = (req, res) => {
  const data = {
    masterName: 'm1',
    scenarioName: req.body.scenarioName,
    scenarioID: req.body.scenarioID,
    spawnsCount: req.body.spawnsCount,
    workers: req.body.workers,
    targetURL: req.body.targetURL,
    isVerifiedOwner: true,
    script: req.body.script,
    id_user: req.user._id,
    completion: false,
  };
  sendJSON(res, 201, data);
  utils.sendDataToMaster(data);
};

const getScenarios = (req, res) => {
  Scenario.where({ id_user: req.user._id })
    .fetchAll()
    .then(data => {
      const scenarios = JSON.stringify(data.models);
      sendJSON(res, 200, { scenarios, site_token: req.user.siteToken });
    });
};

const deleteScenario = (req, res) => {
  Scenario.where({ id: req.body.scenarioID })
    .destroy()
    .then(() => {
      sendJSON(res, 201, { message: 'Scenario deleted' });
    });
};

const rerunScenarioTest = (req, res) => {
  const data = {
    masterName: 'm1',
    scenarioName: req.body.scenarioName,
    spawnsCount: +req.body.spawnsCount,
    workers: +req.body.workers,
    targetURL: req.body.targetURL,
    script: req.body.script,
    isVerifiedOwner: true,
    id_user: req.user._id,
    completion: false,
  };

  if (!data.scenarioName || !data.spawnsCount || !data.targetURL) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  const newScenario = new Scenario(data);
  newScenario.save()
    .then(() => {
      data.scenarioID = newScenario.get('id');
      data.message = 'New scenario has been saved!';
      sendJSON(res, 201, data);
    })
    .catch(err => sendJSON(res, 400, err));

    utils.sendDataToMaster(data);
};

module.exports = { getScenarios, createScenario, runScenarioTest, rerunScenarioTest, deleteScenario };
