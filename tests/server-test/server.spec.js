/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
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

  describe('Account Creation:', () => {
    afterEach(done => {
      User.where('name', 'Felix Ramsey').destroy();
      done();
    });

    it('Signup creates a new user', done => {
      request(app)
        .post('/api/signup')
        .send({
          email: 'me@auklets.com',
          name: 'Felix Ramsey',
          password: 'loadtest' })
        .expect(200)
        .expect(() => {
          User.where({ 'email': 'me@auklets.com' })
            .fetch()
            .then((user) => {
              expect(user.get('name')).to.equal('Felix Ramsey');
            });
        })
        .end(done);
    });
  });
});
