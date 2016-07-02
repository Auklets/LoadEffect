/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/signup-actions';

describe('Redux Signup Actions', () => {
  describe('Signup Authentication Actions', () => {
    it('should send action type SIGNUP_REQUEST on requestSignup()', () => {
      const expectedAction = {
        type: 'SIGNUP_REQUEST',
      };

      expect(action.requestSignup()).to.deep.equal(expectedAction);
    });

    it('should send action type SIGNUP_SUCCESS on receiveSignup() and store user.site_token', () => {
      const fakeUser = {
        site_token: 'somdasodssomesignuptoken',
      };

      const expectedAction = {
        type: 'SIGNUP_SUCCESS',
        siteToken: 'LoadEffect-somdasodssomesignuptoken',
      };

      expect(action.receiveSignup(fakeUser)).to.deep.equal(expectedAction);
    });

    it('should set state isFetching and isAuthenticated to false on signupError()', () => {
      const fakeMessage = 'There was an error signing in';

      const expectedAction = {
        type: 'SIGNUP_FAILURE',
        message: fakeMessage,
      };

      expect(action.signupError(fakeMessage)).to.deep.equal(expectedAction);
    });
  });
});
