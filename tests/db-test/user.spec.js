/* eslint-env mocha */

const expect = require('chai').expect;
const User = require('../../server/models/UsersModel.js');
let user1;
let user2;

describe('User Model Schema', () => {
  before(done => {
    user1 = new User({ name: 'Bill Haug', email: 'Jack@hackreactor.com' });
    user1.setPassword('taiisthebest');
    user1.save();

    user2 = new User({ name: 'Felix Ramsey', email: 'Chris@hackreactor.com' });
    user2.password = user2.setPassword('taiisthebest');
    user2.save();

    done();
  });

  after(done => {
    User.where('name', 'Bill Haug').destroy();
    User.where('name', 'Felix Ramsey').destroy();
    done();
  });

  describe('Creating A New User', err => {
    it('should store new user to database', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user => {
        expect(user.get('email')).to.equal('Chris@hackreactor.com');
        done();
      }).catch(done);
    });

    it('should not be able to save duplicate emails', done => {
      const newUser = new User({ name: 'Chris Ramsey', email: 'Chris@hackreactor.com' });
      newUser.setPassword('taiisthebest');
      newUser.save()
        .then(model => {
          return model;
        })
        .catch(err => {
          expect(err).to.be.ok;
          done();
      });
    });
  });

  describe('Generating JWT Tokens:', () => {
    it('should be a method on user schema', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user => {
        expect(user.generateJwt).to.be.a('function');
        done();
      });
    });

    it('should generate a token', done => {
      User.where('name', 'Bill Haug').fetch().then(user => {
        const token = user.generateJwt();
        expect(token).to.be.a('string');
        expect(token).to.have.length.above(2);
        done();
      });
    });

    it('should generate unique tokens specific to a user', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user1 => {
        User.where('name', 'Bill Haug').fetch().then(user2 => {
          const token1 = user1.generateJwt();
          const token2 = user2.generateJwt();
          expect(token1).to.not.equal(token2);
          done();
        });
      });
    });
  });

  describe('Setting Salted Hash Password:', () => {
    it('should be a method on user schema', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user => {
        expect(user.setPassword).to.be.a('function');
        done();
      });
    });

    it('should save password as hashed instead of plain', done => {
      User.where('name', 'Bill Haug').fetch().then(user => {
        const hash = user.get('hash');
        expect(hash).to.be.a('string');
        expect(hash).to.not.equal('taiisthebest');
        done();
      });
    });

    it('should not generate the same hash for different users', done => {
      User.where('name', 'Bill Haug').fetch().then(user1 => {
        User.where('name', 'Felix Ramsey').fetch().then(user2 => {
          expect(user1.get('hash')).to.not.equal(user2.get('hash'));
          done();
        });
      });
    });
  });

  describe('Checking for Valid Password:', () => {
    it('should be a method on user schema', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user => {
        expect(user.validPassword).to.be.a('function');
        done();
      });
    });

    it('should return false for the wrong password and true for correct password', done => {
      User.where('name', 'Felix Ramsey').fetch().then(user => {
        const correctPassword = user.validPassword('taiisthebest');
        const wrongPassword = user.validPassword('aWrongPassword');
        expect(correctPassword).to.be.true;
        expect(wrongPassword).to.be.false;
        done();
      });
    });
  });
});

