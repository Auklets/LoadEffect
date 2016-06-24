// Handle all requests to master.js server

/*
CURRENT MVP IMPLEMENTATION SPECIFICATIONS
--All work is handled in the webServer function
--Server reponds when all tasks have been completed
--All tasks live within one request function
--Ideal situation: EC2 instances are spun up every time a request is needed
--NOT DESIGNED FOR SCALE
--Error handling - Redistribute work to workers that have gone offline
*/

// ASSUMPTIONS
const tasksPerJob = 10; // Arbitrary number of actions per job

// Dependencies


// Modules
const Queue = require('../queue');
const divide = require('../divide');
const helpers = require('../helpers');

// Global Variables
const jobQueue = new Queue();
let results = [];
let totalJobs = 0;

// Handle incoming requests from Web Server
const webServer = (req, res) => {
  // Individual Task Unit
  const task = {
    scenario: req.body.scenarioName,
    user: req.body.id_user,
    targetUrl: req.body.targetUrl,
    script: req.body.script,
  };

  // Split up jobs into chunks and place into job queue
  const spawnCount = req.body.spawnCount;
  totalJobs = spawnCount;
  const jobsToAdd = divide(spawnCount, tasksPerJob);
  const jobBundle = helpers.bundleTasks(task, tasksPerJob);
  for (let toAdd = 0; toAdd < jobsToAdd; toAdd++) {
    jobQueue.addToQueue(jobBundle);
  }
  console.log('queue is', jobQueue.items);
  console.log('total jobs', totalJobs);

  // Wind up number of requested workers
  const workers = req.body.workers;
  // TODO: CHRIS TO PROVIDE CODE TO WIND UP WORKERS

  res.status(200).send();
};

const complete = (req, res) => {
  console.log('Received POST complete request!', req.body);
  // Add to completed jobs list
  console.log('This is results before the concat', results);
  results = results.concat(req.body);
  console.log('These are our results length', results.length);
  console.log('Total jobs', totalJobs);
  if (results.length == totalJobs) {
    console.log('We are done!');
    // TODO do post request with results to the web server
  }
  res.status(200).send();
  // If items in results matches total Jobs, then we are done
};

// [FOR DEMO PURPOSES]
const tempHandler = (jobs) => {
//   totalJobs = jobs;
//   const jobCount = divide(jobs, denominator);
//   for (let toAdd = 0; toAdd < jobCount; toAdd++) {
//     jobQueue.addToQueue(denominator);
//   }
//   console.log('queue is', jobQueue.items);
//   console.log('total jobs', totalJobs);

//   // TODO: Capacity Check - check to see how many slaves required
//   // TODO: Create ability to create slaves
};

const requestJob = (req, res) => {
  console.log('Got a post request on master server! Queue is', jobQueue.items);
  // Check if jobs are available
  if (jobQueue.checkLength() > 0) {
    const job = jobQueue.takeNext();
    res.json({ job });
  } else {
    // If no jobs available send 0
    res.send('done');
  }
};


module.exports = { webServer, complete, tempHandler, requestJob };
