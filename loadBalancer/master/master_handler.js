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
const denominator = 100; // Arbitrary number of actions per job

// Dependencies


// Modules
const Queue = require('../queue');
const checkCapacity = require('../capacity');
const splitJobs = require('../divide');
const helpers = require('../helpers');

// Global Variables
const jobQueue = new Queue();

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

  tempHandler: (jobs) => {
    const jobCount = splitJobs(jobs, denominator);
    for (let toAdd = 0; toAdd < jobCount; toAdd++) {
      jobQueue.addToQueue(jobCount);
    }
  },

  requestJob: (req, res) => {
    // Check if jobs are available
    if (jobQueue.checkLength() > 0) {
      const jobCount = jobQueue.takeNext();
      res.json(helpers.createPrimeJobs(jobCount));
    }
    // If no jobs available send 0
    res.send(0);
  },

};

module.exports = masterHandler;
