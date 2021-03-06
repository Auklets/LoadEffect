/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.WEB_HOST}:${process.env.WEB_PORT}`;
const request = require('supertest');
const Scenario = require('../../webserver/models/ScenariosModel.js');
const User = require('../../webserver/models/UsersModel.js');

// Outer describe block is written with ES5 to use this.timeout.
// Writing with ES6 fat arrow function will make 'this' binding point to global
describe('End to End New Scenario Creation', function scenarioTest() {
  this.timeout(5000);

  let fakeLocalStorageToken;
  let userId;

  before(done => {
    const user = new User({ name: 'Tai Huynh', email: 'tai@hackreactor.com' });
    user.setPassword('taiisthebest');
    user.generateSiteToken();
    user.save()
      .then(newUser => {
        userId = newUser.get('id');
        new Scenario({
          scenarioName: 'Scenario Test',
          spawnsCount: 1000,
          workers: 10,
          averageElapsedTime: 1000,
          numberActions: 5,
          numberErrors: 0,
          targetURL: 'http://www.anhtaihuynh.com',
          isVerifiedOwner: false,
          script: 'Some kind of script that will run jobs',
          id_user: userId,
        }).save()
          .then(() => {
            new Scenario({
              scenarioName: 'Scenario Test 2',
              spawnsCount: 2000,
              workers: 20,
              averageElapsedTime: 1500,
              numberActions: 5,
              numberErrors: 0,
              targetURL: 'http://www.billramsey.com',
              isVerifiedOwner: false,
              script: 'Do some stuff',
              id_user: userId,
            }).save()
              .then(() => {
                request(app)
                  .post('/api/login')
                  .send({ email: 'tai@hackreactor.com', password: 'taiisthebest' })
                  .expect(res => {
                    fakeLocalStorageToken = res.body.id_token;
                  })
                  .end(done);
              });
          });
      });
  });

  after(done => {
    User.where('name', 'Tai Huynh').destroy();
    Scenario.where('scenarioName', 'Scenario Test').destroy();
    Scenario.where('scenarioName', 'Scenario Test 2').destroy();
    Scenario.where('scenarioName', 'Login Test').destroy();
    done();
  });

  it('should respond and send back an array of previously saved scenarios', done => {
    request(app)
      .get('/api/scenarios')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${fakeLocalStorageToken}`)
      .expect(200)
      .expect(res => {
        const scenarioList = JSON.parse(res.body.scenarios);
        expect(scenarioList[0].scenarioName).to.equal('Scenario Test');
        expect(scenarioList[0].spawnsCount).to.equal(1000);
        expect(scenarioList[1].scenarioName).to.equal('Scenario Test 2');
        expect(scenarioList[1].targetURL).to.equal('http://www.billramsey.com');
        expect(scenarioList[2]).to.be.undefined;
      })
      .end(done);
  });

  it('should be able to create a scenario and store to database', done => {
    const fakeScenarioData = {
      scenarioName: 'Login Test',
      spawnsCount: 5000,
      workers: 30,
      targetURL: 'http://www.felixfeng.com',
      script: 'Another Script that will test login',
    };

    request(app)
      .post('/api/scenarios')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${fakeLocalStorageToken}`)
      .send(fakeScenarioData)
      .expect(201)
      .expect(res => {
        expect(res.body.message).to.equal('New scenario has been saved!');
        Scenario.where('scenarioName', 'Login Test')
          .fetch()
          .then(scenario => {
            expect(scenario.get('targetURL')).to.equal('http://www.felixfeng.com');
            expect(scenario.get('script')).to.equal('Another Script that will test login');
            expect(scenario.get('id_user')).to.equal(userId);
          });
      })
      .end(done);
  });

  it('should not allow creation of new scenario if not all fields are filled', done => {
    request(app)
      .post('/api/scenarios')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${fakeLocalStorageToken}`)
      .send({ scenarioName: 'Tai Test', spawnsCount: 1000 })
      .expect(400)
      .expect(res => {
        expect(res.body.message).to.equal('All fields required');
      })
      .end(done);
  });
});
