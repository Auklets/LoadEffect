// Dependencies
const _ = require('underscore');
const request = require('request');

// Modules
const billsModule = () => {};

// Global Variable
let counter = 0;

// TODO: CURRENTLY HARD CODED
const resultAddress = 'http://localhost:8000/api/complete';
const requestJob = 'http://localhost:8000/api/requestJob';

const handleJob = (jobs) => {
  console.log('Got some work from the server', jobs);
  const results = [];
  _.each(jobs, (job) => {
    const jobResult = {};
    // TODO: To confirm with bill his desired input for his module function
    jobResult[job] = billsModule(job);
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
      handleJob(JSON.parse(body).job);
    }
  });
};

module.exports = { handleJob };
