/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.WEB_HOST}:${process.env.WEB_PORT}`;
const request = require('supertest');
const User = require('../../webserver/models/UsersModel.js');

describe('Express Server', () => {
  describe('Basic HTTP Request:', () => {
    it('should return a 200 status code on GET requests to /', done => {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });

    it('should respond with 302 (redirect) if user inputs invalid url', done => {
      request(app)
        .get('/nonexistent')
        .expect(302)
        .end(done);
    });
  });
});
