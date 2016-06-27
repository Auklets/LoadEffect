/* eslint-env mocha */

const should = require('chai').should();
const http = require('http');
const request = require('request');
const scenario = require('../../loadserver/worker/scripts/scenario.js');

describe('requests should work', () => {
  xit('should make an http GET with a non-zero response time', (done) => {
    scenario.timedRequest({
      method: 'GET',
      url: 'http://localhost:3000',
    })
    .then((res) => {
      (res.elapsedTime).should.be.above(0);
      done();
    })
    .catch(done);
  });

  xit('should make an http POST with a non-zero response time', (done) => {
    scenario.timedRequest({
      method: 'POST',
      url: 'http://localhost:3000',
    })
    .then((res) => {
      (res.elapsedTime).should.be.above(0);
      done();
    })
    .catch(done);
  });
});
