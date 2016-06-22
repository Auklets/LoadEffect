// Dependencies
const _ = require('underscore');
const request = require('request');

// Modules
const script = require('../script/primeTester');

// Global Variable

const resultAddress = 'http://localhost:8000/api/complete';
const requestJob = 'http://localhost:8000/api/requestJob';

const slaveHandler = {
  handleJob: (jobs) => {
    const results = [];
    console.log('We are in the slavehandler!', jobs);
    while (jobs !== null) {
      _.each(jobs, (job) => {
        results.push({ job: script(job) });
      });
      request.post(resultAddress, JSON.stringify(results));
      request.post(requestJob, (error, response, body) => {
        if (error) {
          console.log(error);
        }
        console.log('Received response from POST Request from Master Server');
        slaveHandler.handleJob(body);
      });
    }
    process.exit();
  },
};

module.exports = slaveHandler;
