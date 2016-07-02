const Scenario = require('../models/ScenariosModel');
const dockerController = require('./docker-controller');
const utils = require('../lib/utils');
const request = require('request');
const dns = require('dns');

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
    isVerifiedOwner: false,
    id_user: req.user._id,
  };

  if (!data.scenarioName || !data.spawnsCount || !data.targetURL) {
    return sendJSON(res, 400, { message: 'All fields required' });
  }

  const newScenario = new Scenario(data);
  newScenario.save()
    .then(() => {
      data.scenarioID = newScenario.get('id');
      const dataToSend = {
        message: 'New scenario has been saved!',
        scenarioID: data.scenarioID,
        spawnsCount: +data.spawnsCount,
        targetURL: data.targetURL,
        scenarioName: data.scenarioName,
        workers: +data.workers,
      };
      console.log('This is the data were sending', dataToSend);
      sendJSON(res, 201, dataToSend);
      console.log('Sent data from scenario controller back to client');
    })
    .catch(err => sendJSON(res, 400, err));

  // create Master to execute new scenario
  dockerController.createMaster(
    (masterName) => {
      console.log('masterName', masterName);
      // send data to master
      setTimeout(() => {
        dockerController.getMasterIP(masterName, (masterIP) => {
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
              console.log('Successfully sent data to master');
              console.log('body', body);
            }
          });
        });
      }, 7000);
    });
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
      const scenarios = JSON.stringify(data.models);
      sendJSON(res, 200, { scenarios, site_token: req.user.siteToken });
    });
};

const validateWebsite = (req, res) => {
  const url = req.body.url;
  const scenarioID = req.body.scenarioID;
  const siteToken = `LoadEffect-${req.user.siteToken}`;

  dns.resolveTxt(url, (err, results) => {
    if (err) {
      sendJSON(res, 400, { message: 'There was an error with the validation' });
      return;
    }

    Scenario.where('id', scenarioID)
      .fetch()
      .then(scenario => {
        for (let i = 0, len = results.length; i < len; i++) {
          if (results[i][0] === siteToken) {
            scenario.set('isVerifiedOwner', 1);
            return scenario.save().then(() => {
              sendJSON(res, 201, { message: 'Great! Website is verified' });
            });
          }
        }

        return sendJSON(res, 201, { message: "Sorry, but we were unable to verify. If you've recently added the DNS text record, please give it a few hours before checkingagain" });
      })
      .catch(err => console.log('Uh oh, there was an error in Scenario lookup for website validation', err));
  })
};

module.exports = { getScenarios, createScenario, deleteScenario, validateWebsite };
