// Handle all requests to master.js server

/*
CURRENT MVP IMPLEMENTATION SPECIFICATIONS
--All work is handled in the webServer function
--Server reponds when all tasks have been completed
--All tasks live within one request function
--Ideal situation: EC2 instances are spun up every time a request is needed
--NOT DESIGNED FOR SCALE
*/

// Dependencies


// Modules
import { Queue } from '../queue';
import { checkCapacity } from '../capacity';

// Global Variables
const jobQueue = new Queue();
const slaveQueue = new Queue();

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
};

module.exports = masterHandler;
