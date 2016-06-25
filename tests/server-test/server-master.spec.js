/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
const request = require('supertest');
