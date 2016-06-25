// Dependencies
const request = require('request');
const scenariorunner = require('./scripts/scenario');

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

    scenariorunner.run(job.targetUrl, job.script)
    .then((runresults) => {
    /*
    runresults: {
      scenarioTime: timeToRunScenarioInMilliseconds,
      transactionTimes: [
        [path, statusCode, elapsedTime, dataSizeInBytes, 'GET'],
      ]
    }
    */


      jobResult[job] = runresults;
      results.push(jobResult);
      jobsCompleted++;
    });
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
