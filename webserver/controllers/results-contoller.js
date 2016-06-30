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
}


module.exports = { getData };
