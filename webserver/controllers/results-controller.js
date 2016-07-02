const io = require('../server').io;
// Does this create a new socket connection?

const { getFromSpawn, getFromActions } = require('../lib/helper-data');
const Promise = require('bluebird');

/* EXTRA CREDIT IDEAS
  // Get database where scenario ID and id is greater than the greatest id
    // Get data from DB where timestamp > the last global Variable
      // And where id scenario equals the one we want
    // set lastpull to the latest timestamp of the data received
    // respond with data from database
*/

const getResultsDataHandler = (req) => {
  console.log('Received request in results controller get data!', req);
  const scenarioID = req.currentScenarioID;
  // const testscenarioID = 15;

  Promise.all([getFromActions(scenarioID), getFromSpawn(scenarioID)])
    .spread((resultsActions, resultsSpawn) => {
      const combinedData = {
        spawn: resultsSpawn,
        action: resultsActions,
      };
      console.log('This is the combined data', combinedData);
      io.emit('receiveResultsData', combinedData);
      // res.json(combinedData);
    })
    .catch(err => console.log(err));
};

const getData = (req, res) => {
  // console.log('Received request!', req);
  console.log('Received request in results controller get data!', req.body);
  const scenarioID = req.body.currentScenarioID;
  // const testscenarioID = 15;

  Promise.all([getFromActions(scenarioID), getFromSpawn(scenarioID)])
    .spread((resultsActions, resultsSpawn) => {
      const combinedData = {
        spawn: resultsSpawn,
        action: resultsActions,
      };
      console.log('This is the combined data', combinedData);
      res.json(combinedData);
    })
    .catch(err => console.log(err));
};

module.exports = { getData, getResultsDataHandler };
