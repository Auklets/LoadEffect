const db = require('../config/db');
const Scenario = require('./ScenariosModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

db.knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('users', user => {
      user.increments('id').primary();
      user.string('email', 255).unique();
      user.string('name', 255);
      user.string('siteToken', 255);
      user.string('hash', 255);
      user.string('salt', 255);
      user.timestamps();
    }).then(table => {
      console.log('Users has been created.', table);
    });
  }
});

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  scenario() {
    return this.hasMany(Scenario);
  },

  setPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
    this.set('hash', hash);
    this.set('salt', salt);
  },

  generateSiteToken() {
    const siteToken = crypto.randomBytes(16).toString('hex');
    this.set('siteToken', siteToken);
    return siteToken;
  },

  getSiteToken() {
    return this.get('siteToken');
  },

  validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.get('salt'), 1000, 64).toString('hex');
    return this.get('hash') === hash;
  },

  generateJwt() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id: this.get('id'),
      email: this.get('email'),
      siteToken: this.get('siteToken'),
      name: this.get('name'),
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
  },
});

module.exports = User;
