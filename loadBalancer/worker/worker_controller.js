// Dependencies
const request = require('request');

// Modules
const billsModule = () => {};
// const primeCreator = require('../testData/primeTester.js');

// Global Variable
let jobsCompleted = 0;

// TODO: CURRENTLY HARD CODED
const resultAddress = 'http://localhost:8000/api/complete';
const requestJob = 'http://localhost:8000/api/requestJob';

const handleJob = jobs => {
  console.log('Got some work from the server', jobs);
  const results = [];
  jobs.forEach(job => {
    const jobResult = {};
    // TODO: To confirm with bill his desired input for his module function
    jobResult[job] = billsModule(job);
    results.push(jobResult);
    jobsCompleted++;
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
      console.log('Jobs completed is ', jobsCompleted);
      process.exit();
    } else {
      handleJob(JSON.parse(body).job);
    }
  });
};

module.exports = { handleJob };
