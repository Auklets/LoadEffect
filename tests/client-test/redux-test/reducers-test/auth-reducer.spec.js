/*  eslint-env mocha */
import { expect } from 'chai';
import { authReducer } from '../../../../client/redux/reducers/auth-reducer';
import * as logoutAction from '../../../../client/redux/actionCreators/logout-actions';
import * as loginAction from '../../../../client/redux/actionCreators/login-actions';
import * as signupAction from '../../../../client/redux/actionCreators/signup-actions';

describe('Redux Authentication Reducers', () => {
  describe('Initial State', () => {
    it('should return this initial state', () => {
      const newState = authReducer(undefined, {});
      expect(newState).to.deep.equal({ isAuthenticated: false, isFetching: false });
    });
  });

  describe('Login State', () => {
    it('should set isFetching to true & isAuthenticated to false on login request', () => {
      const fakeState = {
        isFetching: false,
        isAuthenticated: false,
      };
      const newState = authReducer(fakeState, loginAction.requestLogin());

      // Original state should not be mutated
      expect(fakeState.isFetching).to.be.false;
      expect(newState.isFetching).to.be.true;
    });

    it('should set isFetching to false & isAuthenticated to true on login success', () => {
      const fakeSiteToken = { site_token: 'sdausdhsadhashcrpyotask' };
      const fakeState = {
        isFetching: false,
        isAuthenticated: false,
      };

      const newState = authReducer(fakeState, loginAction.receiveLogin(fakeSiteToken));

      // Original state should not be mutated
      expect(fakeState.isAuthenticated).to.be.false;
      expect(fakeState).to.not.have.ownProperty('errorMessage');
      expect(newState.isAuthenticated).to.be.true;
      expect(newState.siteToken).to.equal('LoadEffect-sdausdhsadhashcrpyotask');
      expect(newState).to.have.ownProperty('errorMessage');
    });

    it('should set isFetching & isAuthenticated to false login failure', () => {
      const fakeMessage = 'Error login! This should be set on state';
      const fakeState = {
        isFetching: true,
        isAuthenticated: false,
      };
      const newState = authReducer(fakeState, loginAction.loginError(fakeMessage));

      // Original state should not be mutated
      expect(fakeState.isFetching).to.be.true;
      expect(fakeState).to.not.have.ownProperty('errorMessage');
      expect(newState.isFetching).to.be.false;
      expect(newState.errorMessage).to.equal('Error login! This should be set on state');
      expect(newState).to.have.ownProperty('errorMessage');
    });
  }); // End login state test

  describe('Signup State', () => {
    it('should set isFetching to true & isAuthenticated to false on signup request', () => {
      const fakeState = {
        isFetching: false,
        isAuthenticated: false,
      };
      const newState = authReducer(fakeState, signupAction.requestSignup());

      // Original state should not be mutated
      expect(fakeState.isFetching).to.be.false;
      expect(newState.isFetching).to.be.true;
    });

    it('should set isFetching to false & isAuthenticated to true on signup success', () => {
      const fakeSiteToken = { site_token: 'adsijsadntupsa' };
      const fakeState = {
        isFetching: false,
        isAuthenticated: false,
      };
      const newState = authReducer(fakeState, signupAction.receiveSignup(fakeSiteToken));

      // Original state should not be mutated
      expect(fakeState.isAuthenticated).to.be.false;
      expect(fakeState).to.not.have.ownProperty('errorMessage');
      expect(newState.isAuthenticated).to.be.true;
      expect(newState.siteToken).to.equal('LoadEffect-adsijsadntupsa');
      expect(newState).to.have.ownProperty('errorMessage');
    });

    it('should set isFetching & isAuthenticated to false signup failure', () => {
      const fakeMessage = 'Error signup! This should be set on state';
      const fakeState = {
        isFetching: true,
        isAuthenticated: false,
      };

      const newState = authReducer(fakeState, signupAction.signupError(fakeMessage));

      // Original state should not be mutated
      expect(fakeState.isFetching).to.be.true;
      expect(fakeState).to.not.have.ownProperty('errorMessage');

      expect(newState.isFetching).to.be.false;
      expect(newState.errorMessage).to.equal('Error signup! This should be set on state');
      expect(newState).to.have.ownProperty('errorMessage');
    });
  }); // End signup state test

  describe('Logout State', () => {
    it('should set isFetching & isAuthenticated to true on logout request', () => {
      const fakeState = {
        isFetching: false,
        isAuthenticated: true,
      };
      const newState = authReducer(fakeState, logoutAction.requestLogout());

      // Original state should not be mutated
      expect(fakeState.isFetching).to.be.false;
      expect(newState.isFetching).to.be.true;
    });

    it('should set isFetching to true & isAuthenticated to false on logout success', () => {
      const fakeState = {
        isFetching: false,
        isAuthenticated: true,
        siteToken: 'LoadEffect-sdjiasjdiasjdiasjd',
      };
      const newState = authReducer(fakeState, logoutAction.receiveLogout());

      // Original state should not be mutated
      expect(fakeState.isAuthenticated).to.be.true;
      expect(fakeState.isFetching).to.be.false;
      expect(fakeState.siteToken).to.equal('LoadEffect-sdjiasjdiasjdiasjd');
      expect(newState.siteToken).to.equal('');
    });
  }); // End logout state test
});
