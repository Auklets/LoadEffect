/* eslint-env mocha */
const request = require('request');
const sinon = require('sinon');
const scenario = require('../../deployed/worker/scenario.js');

describe('User Profile', () => {
  const site = 'http:localhost:3000';

  before((done) => {
    sinon
      .stub(request, 'get')
      .yields(null, null);
    done();
  });

  after((done) => {
    request.get.restore();
    done();
  });

  it('can log in using JWT', (done) => {
    const script = `site(\'http://localhost:3000\').login(\'/login\', {"username":"bill", "password":"password"}).get(\'/links\');`;
    scenario.run(site, script).then(() => {
      done();
    }).catch(done);
  });
});
