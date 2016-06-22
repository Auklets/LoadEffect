/* eslint-disable */
// Delete comment above to enable eslint for this file

const expect = require('chai').expect;
const User = require('../../server/models/UsersModel.js');
let user1;
let user2;

xdescribe('User Model Schema', function() {
  beforeEach(function(done) {
    user1 = new User();
    user1.name = 'Bill Haug';
    user1.email = 'Jack@hackreactor.com';
    user1.password = user1.setPassword('taiisthebest');
    user1.save();

    user2 = new User();
    user2.name = 'Felix Ramsey';
    user2.email = 'Chris@hackreactor.com';
    user2.password = user2.setPassword('taiisthebest');
    user2.save();

    done();
  });

  afterEach(function(done) {
    User.remove({}).exec();
    done();
  });

  describe('Creating A New User', function(err) {
    it('should store new user to database', function(done) {
      User.findOne({ email: 'Jack@hackreactor.com' }, function(err, user) {
        expect(user.name).to.equal('Bill Haug');
        done();
      });
    });

    it('should not be able to save duplicate emails', function(done) {
      const newUser = new User();
      newUser.name = 'Chris Ramsey';
      newUser.email = 'Chris@hackreactor.com';
      newUser.password = newUser.setPassword('taiisthebest');
      newUser.save(function(err) {
        expect(err).to.not.be.null;
        done();
      });
    });
  });

  describe('Generating JWT Tokens:', function() {
    it('should be a method on user schema', function(done) {
      expect(user1.generateJwt).to.be.a('function');
      done();
    });

    it('should generate a token', function(done) {
      const token = user1.generateJwt();
      expect(token).to.be.a('string');
      expect(token).to.have.length.above(2);
      done();
    });

    it('should generate unique tokens specific to a user', function(done) {
      const token1 = user1.generateJwt();
      const token2 = user2.generateJwt();
      expect(token1).to.not.equal(token2);
      done();
    });
  });

  describe('Setting Salted Hash Password:', function() {
    it('should be a method on user schema', function(done) {
      expect(user1.setPassword).to.be.a('function');
      done();
    });

    it('should save password as hashed instead of plain', function(done) {
      User.findOne({ email: 'Jack@hackreactor.com' }, function(err, user) {
        expect(user.hash).to.be.a('string');
        expect(user.hash).to.not.equal('taiisthebest');
        done();
      });
    });

    it('should not generate the same hash for different users', function(done) {
      User.find({}, function(err, users) {
        expect(users[0].hash).to.not.equal(users[1].hash);
        done();
      });
    });
  });

  describe('Checking for Valid Password:', function() {
    it('should be a method on user schema', function(done) {
      expect(user1.validPassword).to.be.a('function');
      done();
    });

    it('should return false for the wrong password', function(done) {
      const isCorrectPassword1 = user1.validPassword('wrongpassword');
      const isCorrectPassword2 = user2.validPassword('somethingIncorrect');
      expect(isCorrectPassword1).to.be.false;
      expect(isCorrectPassword2).to.be.false;
      done();
    });

    it('should return true for the correct password', function(done) {
      const isCorrectPassword1 = user1.validPassword('taiisthebest');
      const isCorrectPassword2 = user2.validPassword('taiisthebest');
      expect(isCorrectPassword1).to.be.true;
      expect(isCorrectPassword2).to.be.true;
      done();
    });
  });
});
