const { getFromSpawn, getFromActions, getFromScenario } = require('../lib/helper-data');
const Scenario = require('../models/ScenariosModel');
const Promise = require('bluebird');

const getResultsDataHandler = (socket) =>
  (req) => {
    const scenarioID = req.currentScenarioID;

    Promise.all([getFromActions(scenarioID), getFromSpawn(scenarioID), getFromScenario(scenarioID)])
      .spread((resultsActions, resultsSpawn, resultsScenario) => {
        const combinedData = {
          spawn: resultsSpawn,
          action: resultsActions,
          scenario: resultsScenario,
        };
        socket.emit('receiveResultsData', combinedData);
      })
      .catch(err => console.log(err));
  };

const saveCompletedData = (data) => {
  const calculated = data.calculated;
  Scenario.where('id', data.scenarioID)
    .fetch()
    .then(scenario => {
      scenario.save({
        averageElapsedTime: calculated.averageElapsedTime,
        numberActions: calculated.numberActions,
        numberErrors: calculated.numberErrors,
        completion: true,
      }, { patch: true }
    )
    .catch(err => console.log(err));
    });
};

module.exports = { getResultsDataHandler, saveCompletedData };
