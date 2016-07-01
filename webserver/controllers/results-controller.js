const Spawn = require('../models/SpawnsModel');
const Action = require('../models/ActionsModel');
const Promise = require('bluebird');

/* EXTRA CREDIT IDEAS
  // Get data from spawns database
  // Get database where scenario ID and id is greater than the greatest id
    // Get data from DB where timestamp > the last global Variable
      // And where id scenario equals the one we want
    // set lastpull to the latest timestamp of the data received
    // respond with data from database
*/

const getData = (req, res) => {
  // Pull correct data from database
  // console.log('Received request!', req);
  console.log('Received request in results controller get data!', req.body);
  const scenarioID = req.body.currentScenarioID;
  // const testscenarioID = 15;

  const getFromSpawn = () =>
    new Promise((resolve, reject) => {
      Spawn.where('id_scenario', scenarioID)
      .fetchAll()
      .then(data => {
        const cleanedData = JSON.parse(JSON.stringify(data));
        const dataToSend = { labels: [], series: [] };
        for (let i = 0; i < cleanedData.length; i++) {
          dataToSend.labels.push(i);
          dataToSend.series.push(cleanedData[i].totalTime);
        }
        // Send back the following
          /*
            {
              labels: [],
              series: [],
            }
          */
        resolve(dataToSend);
      })
      .catch(reject);
    });

  const getFromActions = () =>
    new Promise((resolve, reject) => {
      Action.where('id_scenario', scenarioID)
      .fetchAll()
      .then(data => {
        const cleanedData = JSON.parse(JSON.stringify(data));
        const dataToSend = { index: [], httpVerb: [], statusCode: [], elapsedTime: [] };
        for (let i = 0; i < cleanedData.length; i++) {
          dataToSend.index.push(i);
          dataToSend.httpVerb.push(cleanedData[i].httpVerb);
          dataToSend.statusCode.push(cleanedData[i].statusCode);
          dataToSend.elapsedTime.push(cleanedData[i].elapsedTime);
        }
        console.log('This is the cleaned data from Action', dataToSend);
        resolve(dataToSend);
      })
      .catch(reject);
    });

  Promise.all([getFromActions(), getFromSpawn()])
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

module.exports = { getData };
