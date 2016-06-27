/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
const request = require('supertest');
const User = require('../../webserver/models/UsersModel.js');

xdescribe('Express Server', () => {
  describe('Basic HTTP Request:', () => {
    it('should return a 200 status code on GET requests to /', done => {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });

    it('should respond with 404 if user inputs invalid url', done => {
      request(app)
        .get('/nonexistent')
        .expect(404)
        .end(done);
    });
  });

  describe('Account Creation:', () => {
    it('Signup creates a new user', done => {
      request(app)
        .post('/api/signup')
        .send({
          email: 'me@auklets.com',
          name: 'Felix Ramsey',
          password: 'loadtest' })
        .expect(200)
        .expect(() => {
          User.findOne({ 'email': 'me@auklets.com' })
            .exec((err, user) => {
              expect(user.name).to.equal('Felix Ramsey');
            });
        })
        .end(done);
    });
  });
});
