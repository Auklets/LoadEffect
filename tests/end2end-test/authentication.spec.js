/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
const request = require('supertest');
const User = require('../../webserver/models/UsersModel.js');

describe('End to End Authentication', () => {
  describe('Login:', () => {
    before(done => {
      const user = new User({ name: 'Tai Huynh', email: 'tai@hackreactor.com' });
      user.setPassword('taiisthebest');
      user.save();
      done();
    });

    after(done => {
      User.where('name', 'Tai Huynh').destroy();
      done();
    });

    it('should log in an existing user', done => {
      request(app)
        .post('/api/login')
        .send({ email: 'tai@hackreactor.com', password: 'taiisthebest' })
        .expect(200)
        .expect(res => {
          expect(res.body.id_token).to.be.a('string');
          expect(res.body.id_token).to.have.length.above(10);
        })
        .end(done);
    });

    it('should require that user fills in both email and password fields', done => {
      request(app)
        .post('/api/login')
        .send({ email: 'tai@hackreactor.com' })
        .expect(400)
        .expect(res => {
          expect(res.body.message).to.equal('All fields required');
        })
        .end(done);
    });

    it('should not provide access on incorrect login', done => {
      request(app)
        .post('/api/login')
        .send({ email: 'tai@hackreactor.com', password: 'tai is too cool' })
        .expect(401)
        .expect(res => {
          expect(res.body.id_token).to.be.undefined;
          expect(res.body.message).to.equal('Invalid credentials');
        })
        .end(done);
    });
  });

  describe('Signup:', () => {
    after(done => {
      User.where('name', 'Felix Ramsey').destroy();
      done();
    });

    it('should create a new user', done => {
      request(app)
        .post('/api/signup')
        .send({
          email: 'me@auklets.com',
          name: 'Felix Ramsey',
          password: 'loadtest' })
        .expect(200)
        .expect(res => {
          expect(res.body.id_token).to.be.a('string');
          expect(res.body.id_token).to.have.length.above(10);
        })
        .end(done);
    });

    it('should store user to database on creation', done => {
      User.where('email', 'me@auklets.com')
        .fetch()
        .then(user => {
          expect(user.get('name')).to.equal('Felix Ramsey');
          expect(user.validPassword('loadtest')).to.be.true;
          done();
        })
        .catch(done);
    });
  });
});
