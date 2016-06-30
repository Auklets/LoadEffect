const Spawn = require('../models/SpawnsModel');
const request = require('request');
const utils = require('../lib/utils');


/* EXTRA CREDIT IDEAS
  // Get data from spawns database
    // Get data from DB where timestamp > the last global Variable
      // And where id scenario equals the one we want
    // set lastpull to the latest timestamp of the data received
    // respond with data from database
*/

const getData = (req, res) => {
  // Pull correct data from database
  console.log('Received request in results controller get data!', req.body);
  const testscenarioID = 45;
  const scenarioID = req.body.currentScenarioID;
  Spawn.where('id_scenario', testscenarioID)
    .fetchAll()
    .then(data => {
      const cleanedData = JSON.parse(JSON.stringify(data));
      console.log('Spawn Data from database', JSON.parse(JSON.stringify(data)));
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
      res.json(dataToSend);
    });
};

module.exports = { getData };
