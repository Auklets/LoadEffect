/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/scenario-actions';

describe('Redux Scenario Actions', () => {
  describe('Scenario Modal Actions', () => {
    it('should set state isScenarioModalOpen to true on showScenarioModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_SCENARIO_MODAL,
        isScenarioModalOpen: true,
      };

      expect(action.showScenarioModal()).to.deep.equal(expectedAction);
    });

    it('should set state isScenarioModalOpen to false on hideScenarioModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_SCENARIO_MODAL,
        isScenarioModalOpen: false,
      };

      expect(action.hideScenarioModal()).to.deep.equal(expectedAction);
    });
  });

   describe('Scenario Script Validation Actions', () => {
    it('should set state isValidScript and attemptedCheck to true on validScript()', () => {
      const expectedAction = {
        type: action.VALID_SCRIPT,
        isValidScript: true,
        attemptedCheck: true,
      };

      expect(action.validScript()).to.deep.equal(expectedAction);
    });

    it('should set state isValidScript to false and attemptedCheck to true on invalidScript()', () => {
      const expectedAction = {
        type: action.VALID_SCRIPT,
        isValidScript: false,
        attemptedCheck: true,
      };

      expect(action.invalidScript()).to.deep.equal(expectedAction);
    });

    it('should set state isValidScript and attemptedCheck to false on resetCheck()', () => {
      const expectedAction = {
        type: action.RESET_ATTEMPT_CHECK,
        isValidScript: false,
        attemptedCheck: false,
      };

      expect(action.resetCheck()).to.deep.equal(expectedAction);
    });
  });

  describe('Scenario Get and Create Actions', () => {
    it('should set state scenario to an array of objects on allScenarios()', () => {
      const fakeResponse = JSON.stringify([
        { scenarioName: 'Test One', targetURL: 'http://www.google.com' },
        { scenarioName: 'Test Two', targetURL: 'http://wwww.facebook.com' },
        { scenarioName: 'Test Three', targetURL: 'http://www.twitter.com' },
      ]);

      const expectedAction = {
        type: action.GET_SCENARIOS,
        scenario: JSON.parse(fakeResponse),
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
