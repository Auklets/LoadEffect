/* eslint-env mocha */

const expect = require('chai').expect;
const Scenario = require('../../webserver/models/ScenariosModel.js');

describe('Scenario Model Schema', () => {
  before(done => {

    new Scenario({
      scenarioName: 'Scenario Test',
      spawnsCount: 1000,
      workers: 10,
      averageResponseTime: 2000,
      averageActionTime: 1000,
      targetURL: 'http://www.anhtaihuynh.com',
      script: 'Some kind of script that will run jobs',
      id_user: 1,
    }).save();

    new Scenario({
      scenarioName: 'Scenario Test 2',
      spawnsCount: 2000,
      workers: 20,
      averageResponseTime: 3000,
      averageActionTime: 1500,
      targetURL: 'http://www.billramsey.com',
      script: 'Do some stuff',
      id_user: 1,
    }).save();

    new Scenario({
      scenarioName: 'Login Test',
      spawnsCount: 5000,
      workers: 30,
      averageResponseTime: 1700,
      averageActionTime: 1200,
      targetURL: 'http://www.felixfeng.com',
      script: 'Another Script',
      id_user: 2,
    }).save();

    done();
  });

  after(done => {
    Scenario.where('scenarioName', 'Scenario Test').destroy();
    Scenario.where('scenarioName', 'Scenario Test 2').destroy();
    Scenario.where('scenarioName', 'Login Test').destroy();
    done();
  });

  describe('Creating A New Scenario', err => {
    it('should store new scenario to database', done => {
      Scenario.where('scenarioName', 'Scenario Test')
        .fetch()
        .then(scenario => {
          expect(scenario.get('scenarioName')).to.equal('Scenario Test');
          expect(scenario.get('spawnsCount')).to.equal(1000);
          expect(scenario.get('workers')).to.equal(10);
          expect(scenario.get('averageResponseTime')).to.equal(2000);
          expect(scenario.get('averageActionTime')).to.equal(1000);
          expect(scenario.get('targetURL')).to.equal('http://www.anhtaihuynh.com');
          expect(scenario.get('script')).to.equal('Some kind of script that will run jobs');
          done();
        })
        .catch(done);
    });
  });

  describe('Multiple Scenarios for One User', err => {
    it('should retrieve multiple scenarios that belong to a user', done => {
      Scenario.where('id_user', 1)
        .fetchAll()
        .then(db => {
          expect(db.models[0].get('scenarioName')).to.equal('Scenario Test');
          expect(db.models[1].get('scenarioName')).to.equal('Scenario Test 2');
          done();
        })
        .catch(done);
    });
  });

  it('should only return one scenario if a user only has one scenario', done => {
    Scenario.where('id_user', 2)
      .fetchAll()
      .then(db => {
        expect(db.models[0].get('scenarioName')).to.equal('Login Test');
        expect(db.models[1]).to.be.undefined;
        done();
      });
  });
});

