/* eslint-disable */

// Dependencies
const expect = require('chai').expect;
const sinon = require('sinon');

// Modules
const workerHandler = require('../worker/worker_controller.js');
const script = require('../script/primeTester');

// WORKER: Job Execution
describe('Worker', () => {
  describe('handleJob function', () => {
    // Worker executes job with the provided "script"
    it('should execute job with provided script', sinon.test((done) => {
      const testScript = this.spy(script);
      workerhandler.handleJob(100, testScript);

      testScript.called();

    }));
    // Worker executes all the jobs it was provided
    it('should execute all jobs it was provided', sinon.test((done) => {
      // const checkCompletion = this.spy(workerHandler, 'handleJob');
      // const testJob = [ 1, 2, 3 ];
      // // Feed in jobs number
      // checkCompletion(testJob);
      // // Check if results.length is equal to jobs.length


      // done();
    }));
    // Results are POSTed to a particular address
    it('should POST results to the provided IP address', () => {

    });
    // Worker POSTs for more work after completion
    it('should ask for more work after completion', () => {

    });
  });
});



