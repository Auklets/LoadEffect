/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/modal-actions';

describe('Redux Login Actions', () => {
  describe('Login Modal Actions', () => {
    it('should set state isLoginOpen to true on showLoginModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_LOGIN_MODAL,
        isLoginOpen: true,
      };

      expect(action.showLoginModal()).to.deep.equal(expectedAction);
    });

    it('should set state isLoginOpen to false on hideLoginModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_LOGIN_MODAL,
        isLoginOpen: false,
      };

      expect(action.hideLoginModal()).to.deep.equal(expectedAction);
    });
  });

  describe('Signup Modal Actions', () => {
    it('should set state isSignupOpen to true on showSignupModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_SIGNUP_MODAL,
        isSignupOpen: true,
      };

      expect(action.showSignupModal()).to.deep.equal(expectedAction);
    });

    it('should set state isSignupOpen to false on hideSignupModal()', () => {
      const expectedAction = {
        type: action.TOGGLE_SIGNUP_MODAL,
        isSignupOpen: false,
      };

      expect(action.hideSignupModal()).to.deep.equal(expectedAction);
    });
  });

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

});
