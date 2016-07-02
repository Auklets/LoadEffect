/* eslint-disable */
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');
const DockerController = require('../../webserver/controllers/docker-controller');

const url = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;

// specify tests for functionality of spawning docker instances on incoming API requests
describe('Docker Controller Tests: ', function() {

  // test working API routes
  describe('Requests to docker API routes: ', function() {
    describe('POST /api/docker: ', function() {
      it('should respond with 201 statusCode and success message', function(done) {
        request(url)
          .post('/api/docker')
          .expect(201)
          .expect('container successfully created and running', done());
      });
    });

    describe('GET /api/docker: ', function() {
      it('should respond with 200 statusCode and checked message', function(done) {
        request(url)
          .get('/api/docker')
          .expect(200)
          .expect('container checked', done());
      });
    });
  })

  // incoming post request to /api/docker calls correct functions
  xdescribe('Controller function calls: ', function() {
    it('should invoke createContainer function on POST request to /api/docker', function(done) {
      request(url)
        .post('/api/docker')
        .send('')
        .end(function(err, res) {
          sinon.assert.called(createContainer);
          done();
        });
    });

    it('should invoke checkContainer function on GET request to /api/docker', function(done) {
      const checkContainer = sinon.spy(DockerController, 'checkContainer');
      request(url)
        .get('/api/docker')
        .send('')
        .end(function(err, res) {
          sinon.assert.called(checkContainer);
          done();
        });
    });
  });

  // test creation of docker container & run

  // check if number of containers increased by one

  // test docker inspect command

  // test docker compose command

});


