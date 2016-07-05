const dns = require('dns');
const Scenario = require('../models/ScenariosModel');
const utils = require('../lib/utils');
const sendJSON = utils.sendJSON;

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

module.exports = { validateWebsite };
