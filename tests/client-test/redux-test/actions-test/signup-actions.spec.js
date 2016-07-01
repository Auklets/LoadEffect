/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/signup-actions';

describe('Redux Signup Actions', () => {
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

  describe('Signup Authentication Actions', () => {
    it('should set state isFetching to true and isAuthenticate to false on requestSignup()', () => {
      const fakeCreds = {
        email: 'tai@hackreactor.com',
        name: 'Tai Huynh',
        password: 'passsss',
      };

      const expectedAction = {
        type: action.SIGNUP_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds: {
          email: 'tai@hackreactor.com',
          name: 'Tai Huynh',
          password: 'passsss',
        },
      };

      expect(action.requestSignup(fakeCreds)).to.deep.equal(expectedAction);
    });

    it('should set state isFetching to false and isAuthenticated to true on receiveSignup() and store user.id_token', () => {
      const fakeUser = {
        id_token: 'somdasodssomesignuptoken',
      };

      const expectedAction = {
        type: action.SIGNUP_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: 'somdasodssomesignuptoken',
      };

      expect(action.receiveSignup(fakeUser)).to.deep.equal(expectedAction);
    });

    it('should set state isFetching and isAuthenticated to false on signupError()', () => {
      const fakeMessage = 'There was an error signing in';

      const expectedAction = {
        type: action.SIGNUP_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: fakeMessage,
      };

      expect(action.signupError(fakeMessage)).to.deep.equal(expectedAction);
    });
  });
});
