const Scenario = require('../models/ScenariosModel');
const dockerController = require('./docker-controller');
const utils = require('../lib/utils');
const request = require('request');
const sendJSON = utils.sendJSON;

// URL Configuration for Master Server
const masterProtocol = 'http://';
const masterHost = process.env.MASTERHOST_PORT_1000_TCP_ADDR;
const masterPort = 2000;
const masterRoute = '/api/master';

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

  const newScenario = new Scenario(data);
  newScenario.save()
    .then(() => {
      data.scenarioID = newScenario.get('id');
      sendJSON(res, 201, { message: 'New scenario has been saved!' });
    })
    .catch(err => sendJSON(res, 400, err));

  // create Master to execute new scenario
  dockerController.createMaster(
    (masterName) => {
      console.log('masterName', masterName);
      // send data to master
      setTimeout(() => {
        dockerController.getMasterIP(masterName, function(masterIP) {
          console.log('Master IP received:', masterIP);
          const masterUrl = `${masterProtocol}${masterIP}:${masterPort}${masterRoute}`;
          console.log('sending data to', masterUrl);
          data.masterName = masterName;
          request.post({
            url: masterUrl,
            json: true,
            body: data,
          },
          (err, response, body) => {
            if (err) {
              console.log('Error while sending data to master', err);
            } else {
              console.log("Successfully sent data to master");
              console.log('body', body);
            }
          });
        });
      }, 7000);
    }
  );

  setTimeout(() => {
    dockerController.getMasterIP(masterName, function(masterIP) {
      console.log('Master IP received:', masterIP);
      const masterUrl = `${masterProtocol}${masterIP}:${masterPort}${masterRoute}`;
      console.log('sending data to', masterUrl);
      request.post({
        uri: masterUrl,
        method: 'POST',
        json: true,
        body: data,
      },
      (err, response, body) => {
        if (err) {
          console.log('Error while sending data to master', err);
        } else {
          console.log('response:', response);
          console.log('body', body);
        }
      });
    });
  }, 1000);
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
