/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/scenario-actions';

describe('Redux Scenario Actions', () => {
  describe('Scenario Script Validation Actions', () => {
    it('should set state isValidScript to true on validScript()', () => {
      const expectedAction = {
        type: action.VALID_SCRIPT,
        isValidScript: true,
      };

      expect(action.validScript()).to.deep.equal(expectedAction);
    });

    it('should set state isValidScript to false on invalidScript()', () => {
      const expectedAction = {
        type: action.VALID_SCRIPT,
        isValidScript: false,
      };

      expect(action.invalidScript()).to.deep.equal(expectedAction);
    });

    it('should send action type RESET_ATTEMPT_CHECK on resetCheck()', () => {
      const expectedAction = {
        type: 'RESET_ATTEMPT_CHECK',
      };

      expect(action.resetCheck()).to.deep.equal(expectedAction);
    });
  });

  describe('Scenario Get and Create Actions', () => {
    it('should set state scenario to an array of objects on allScenarios()', () => {
      const fakeResponse = {
        scenarios: JSON.stringify([
          { scenarioName: 'Test One', targetURL: 'http://www.google.com' },
          { scenarioName: 'Test Two', targetURL: 'http://wwww.facebook.com' },
          { scenarioName: 'Test Three', targetURL: 'http://www.twitter.com' },
        ]),
      };

      const expectedAction = {
        type: action.GET_SCENARIOS,
        scenario: JSON.parse(fakeResponse.scenarios),
      };

      expect(action.allScenarios(fakeResponse)).to.deep.equal(expectedAction);
    });

    it('should set state currentScenarioID to scenario ID on storeRecentScenarioID()', () => {
      // Felix test
    });

    it('should set state currentSpawnsCount to spawns count on storeRecentUserCount()', () => {
      // Felix test
    });
  });

});
