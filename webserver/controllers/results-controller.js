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
  const scenarioID = 'TODO_scenarioID';
  Spawn.where('scenarioID', scenarioID)
    .then(data => {
      res.json(data);
    });
};

module.exports = { getData };
