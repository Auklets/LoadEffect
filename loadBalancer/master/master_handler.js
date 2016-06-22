// Handle all requests to master.js server

/*
CURRENT MVP IMPLEMENTATION SPECIFICATIONS
--All work is handled in the webServer function
--Server reponds when all tasks have been completed
--All tasks live within one request function
--Ideal situation: EC2 instances are spun up every time a request is needed
--NOT DESIGNED FOR SCALE
*/

// ASSUMPTIONS
const denominator = 50; // Arbitrary number of actions per job

// Dependencies


// Modules
const Queue = require('../queue');
const checkCapacity = require('../capacity');
const divide = require('../divide');
const helpers = require('../helpers');

// Global Variables
const jobQueue = new Queue();
let results = [];
let totalJobs = 0;

const masterHandler = {
  // Handle incoming requests from Web Server
  webServer: (req, res) => {
    const capacity = checkCapacity();
    // CONFIRM WITH THAI - The FORMAT OF THE BODY
    const job = req.body;

    // Slave creation / wind down as needed
      // Check capacity of server

    // Split up jobs and place into job queue
      // Check required capacity required

    // Distribute work to workers

    // Error handling - Redistribute work to workers that have gone offline

    // Calculate completion of work

    // Respond to server that the job is complete
  },

  complete: (req, res) => {
    console.log('Received POST complete request!', req.body);
    // Add to completed jobs list
    console.log('This is results before the concat', results);
    results = results.concat(req.body);
    console.log('These are our results length', results.length);
    console.log('Total jobs', totalJobs);
    if (results.length == totalJobs) {
      console.log('We are done!');
    }
    // If items in results matches total Jobs, then we are done
  },

  tempHandler: (jobs) => {
    totalJobs = jobs;
    const jobCount = divide(jobs, denominator);
    for (let toAdd = 0; toAdd < jobCount; toAdd++) {
      jobQueue.addToQueue(denominator);
    }
    console.log('queue is', jobQueue.items);
    console.log('total jobs', totalJobs);
  },

  requestJob: (req, res) => {
    console.log('Got a post request on master server! Queue is', jobQueue.items);
    // Check if jobs are available
    if (jobQueue.checkLength() > 0) {
      const jobCount = jobQueue.takeNext();
      res.json({ job: helpers.createPrimeJobs(jobCount) });
    } else {
      // If no jobs available send 0
      res.send('done');
    }
  },

};

module.exports = masterHandler;
