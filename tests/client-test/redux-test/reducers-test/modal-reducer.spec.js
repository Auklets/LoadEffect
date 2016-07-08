/*  eslint-env mocha */
import { expect } from 'chai';
import { modalReducer } from '../../../../client/redux/reducers/modal-reducer';
import * as modalAction from '../../../../client/redux/actionCreators/modal-actions';

describe('Redux Modal Reducers', () => {
  const initialState = {
    isLoginOpen: false,
    isSignupOpen: false,
    isScenarioModalOpen: false,
    isVerifyModalOpen: false,
  };

  describe('Initial State', () => {
    it('should return an initial state', () => {
      const newState = modalReducer(undefined, {});

      expect(newState).to.deep.equal(initialState);
    });
  });

  it('should be able to toggle Login Modal', () => {
    const newState = modalReducer(initialState, modalAction.showLoginModal());
    const nextState = modalReducer(newState, modalAction.hideLoginModal());

    expect(initialState.isLoginOpen).to.be.false;
    expect(newState.isLoginOpen).to.be.true;
    expect(nextState.isLoginOpen).to.be.false;
  });

  it('should be able to toggle Signup Modal', () => {
    const newState = modalReducer(initialState, modalAction.showSignupModal());
    const nextState = modalReducer(newState, modalAction.hideSignupModal());

    expect(initialState.isSignupOpen).to.be.false;
    expect(newState.isSignupOpen).to.be.true;
    expect(nextState.isSignupOpen).to.be.false;
  });

  it('should be able to toggle Scenario Modal', () => {
    const newState = modalReducer(initialState, modalAction.showScenarioModal());
    const nextState = modalReducer(newState, modalAction.hideScenarioModal());

    expect(initialState.isScenarioModalOpen).to.be.false;
    expect(newState.isScenarioModalOpen).to.be.true;
    expect(nextState.isScenarioModalOpen).to.be.false;
  });

  it('should be able to toggle Verify Modal', () => {
    const newState = modalReducer(initialState, modalAction.showVerifyModal());
    const nextState = modalReducer(newState, modalAction.hideVerifyModal());

    expect(initialState.isVerifyModalOpen).to.be.false;
    expect(newState.isVerifyModalOpen).to.be.true;
    expect(nextState.isVerifyModalOpen).to.be.false;
  });
});
