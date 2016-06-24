/* eslint-disable */

// DEPENDENCIES
const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');

// MODULES
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT2}`;
const masterHandler = require('../master/master_handler.js');

// MASTER
describe('Master Server', () => {
  // When sending jobs, should return job results;
  describe('POST api/master', () => {
    it('should respond a 200 status code when receiving job', done => {
      request(app)
        .post('/api/master')
        .expect(200)
        .end(done)      
    });
  });

  describe('POST /api/requestJob', () => {
    // Should respond with 200 status code
    it('should return a 200 status code and return JSON', done => {
      request(app)
        .post('/api/requestJob')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    });
  });

  describe('POST /api/complete', () => {
    // Should respond with 200 status code
    it('should respond with 200 status code', done => {
      request(app)
        .post('/api/complete')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)
    });
  });

});
    