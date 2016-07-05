const Spawn = require('../models/SpawnsModel');
const Action = require('../models/ActionsModel');
const Scenario = require('../models/ScenariosModel');

const getFromSpawn = (scenarioID) =>
  new Promise((resolve, reject) => {
    Spawn.where('id_scenario', scenarioID)
    .fetchAll()
    .then(data => {
      const cleanedData = JSON.parse(JSON.stringify(data));
      const dataToSend = { spawnLabel: [], elapsedTimeSpawn: [] };
      for (let i = 0; i < cleanedData.length; i++) {
        dataToSend.spawnLabel.push(i);
        dataToSend.elapsedTimeSpawn.push(cleanedData[i].totalTime);
      }
      resolve(dataToSend);
    })
    .catch(reject);
  });

const getFromActions = (scenarioID) =>
  new Promise((resolve, reject) => {
    Action.where('id_scenario', scenarioID)
    .fetchAll()
    .then(data => {
      const cleanedData = JSON.parse(JSON.stringify(data));
      // console.log('action data', cleanedData);
      const dataToSend = { index: [], httpVerb: [], statusCode: [], elapsedTimeAction: [] };
      for (let i = 0; i < cleanedData.length; i++) {
        dataToSend.index.push(i + 1);
        dataToSend.httpVerb.push(cleanedData[i].httpVerb);
        dataToSend.statusCode.push(cleanedData[i].statusCode);
        // Change this to elapsedTIme Action soon.
        dataToSend.elapsedTimeAction.push(cleanedData[i].elapsedTimeAction);
      }
      resolve(dataToSend);
    })
    .catch(reject);
  });

const getFromScenario = (scenarioID) =>
  new Promise((resolve, reject) => {
    Scenario.where('id', scenarioID)
    .fetch()
    .then(data => {
      const dataToSend = JSON.parse(JSON.stringify(data));
      // console.log('Scenario Data format', dataToSend);
      resolve(dataToSend);
    })
    .catch(reject);
  });

module.exports = { getFromSpawn, getFromActions, getFromScenario };
