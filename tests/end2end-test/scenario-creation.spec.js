/* eslint-env mocha */

const expect = require('chai').expect;
const app = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
const request = require('supertest');
const Scenario = require('../../webserver/models/ScenariosModel.js');
const User = require('../../webserver/models/UsersModel.js');

xdescribe('End to End New Scenario Creation', () => {
  let fakeLocalStorageToken;
  let userId;

  describe('Scenario:', () => {
    before(done => {
      const user = new User({ name: 'Tai Huynh', email: 'tai@hackreactor.com' });
      user.setPassword('taiisthebest');
      user.save()
        .then(() => {
          userId = user.get('id');

          new Scenario({
            scenarioName: 'Scenario Test',
            spawnsCount: 1000,
            workers: 10,
            averageResponseTime: 2000,
            averageActionTime: 1000,
            targetURL: 'http://www.anhtaihuynh.com',
            script: 'Some kind of script that will run jobs',
            id_user: userId,
          }).save();

          new Scenario({
            scenarioName: 'Scenario Test 2',
            spawnsCount: 2000,
            workers: 20,
            averageResponseTime: 3000,
            averageActionTime: 1500,
            targetURL: 'http://www.billramsey.com',
            script: 'Do some stuff',
            id_user: userId,
          }).save();
        });

      request(app)
        .post('/api/login')
        .send({ email: 'tai@hackreactor.com', password: 'taiisthebest' })
        .expect(res => {
          fakeLocalStorageToken = res.body.id_token;
        })
        .end(done);
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
          const scenarioList = JSON.parse(res.body);
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
});
