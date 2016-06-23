/* eslint-disable */

const expect = require('chai').expect;
const sinon = require('sinon');
const supertest = require('supertest');

// MASTER
  // When sending jobs, should return job results;

  // Temp Handler
    // Jobs are divided based on jobs and denominator
    // Total number of jobs queued is equal to original job Count
  // Request Job Handler
    // If jobQueue length > 0 send array of jobs
    // If no jobs in Queue, send 'done' in body
  // Complete
    // Adds items in body to new results
    