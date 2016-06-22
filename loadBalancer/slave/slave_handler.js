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
    _.each(jobs, (job) => {
      const jobResult = {};
      jobResult[job] = script(job);
      results.push(jobResult);
    });
    request.post({
      url: resultAddress,
      json: true,
      body: results,
    });
    // This post response is happening
    request.post(requestJob, (error, response, body) => {
      console.log('Received response from POST Request from Master Server', body);
      if (error) {
        console.log(error);
      } else if (body === 'done') {
        process.exit();
      } else {
        slaveHandler.handleJob(JSON.parse(body).job);
      }
    });
  },
};

module.exports = slaveHandler;
