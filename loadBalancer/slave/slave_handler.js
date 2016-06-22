// Dependencies
const _ = require('underscore');
const request = require('request');

// Modules
const script = require('../script/primeTester');

// Global Variable
let counter = 0;


const resultAddress = 'http://localhost:8000/api/complete';
const requestJob = 'http://localhost:8000/api/requestJob';

const slaveHandler = {
  handleJob: (jobs) => {
    console.log('Got some work from the server', jobs);
    const results = [];
    _.each(jobs, (job) => {
      const jobResult = {};
      jobResult[job] = script(job);
      results.push(jobResult);
      counter++;
    });
    request.post({
      url: resultAddress,
      json: true,
      body: results,
    });
    // This post response is happening
    request.post(requestJob, (error, response, body) => {
      if (error) {
        console.error(error);
      } else if (body === 'done') {
        console.log('Jobs completed is ', counter);
        process.exit();
      } else {
        slaveHandler.handleJob(JSON.parse(body).job);
      }
    });
  },
};

module.exports = slaveHandler;
