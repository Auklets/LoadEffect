/* eslint-disable */
const expect = require('chai').expect;
const app = 'http://localhost:8000'//require('../../server/server');
const request = require('supertest');
const User = require('../../server/models/UsersModel.js');

describe('Express Server', function() {
  describe('Basic HTTP Request:', function() {

    it('Returns a 302 status code on GET requests /', function(done) {
      request(app).get('/')
        .expect(200)
        .end(function(err) {
          done();
        })
    });

    it('Logs in existing users', function(done) {
      request(app)
        .post('/api/login')
        .send({
          'email': 'Anhtaih@hackreactor.com',
          'password': 'password-to-be-salted-and-hashed' })
        .expect(200)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/');
        })
        .end(done());
    });

    xit('Users that do not exist are kept on login page', function(done) {
      request(app)
        .post('/api/login')
        .send({
          'username': 'Bill',
          'password': 'Haug' })
        .expect(401)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/login'); // currently broken
        })
        .end(done());
    });
  }); // Account Login

  xdescribe('Priviledged Access:', function() {

    // /*  Authentication  */
    // // TODO: xit out authentication
    it('Redirects to home page if a user tries to access a protected route and is not signed in', function(done) {
      request(app)
        .get('/')
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/');
        })
        .end(done());
    });
  }); // 'Privileged Access'

  xdescribe('Account Creation:', function() {
    it('Signup creates a new user', function(done) {
      request(app)
        .post('/api/signup')
        .send({
          email: 'me@auklets.com',
          name: 'Felix Ramsey',
          password: 'loadtest' })
        .expect(200)
        .expect(function() {
          User.findOne({ 'email': 'me@auklets.com' })
            .exec(function(err, user) {
              expect(user.name).to.equal('Felix Ramsey');
            });
        })
        .end(done());
    });

    it('Successful signup logs in a new user', function(done) {
      request(app)
        .post('/api/signup')
        .send({
          'email': 'Chris@me.com',
          'password': 'dontHaug' })
        .expect(200)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/');
          request(app)
            .get('/api/logout')
            .expect(302);
        })
        .end(done());
    });
  }); // 'Account Creation'
});
