/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/login-actions';

describe('Redux Login Actions', () => {
  describe('Login Authentication Actions', () => {
    it('should send action type LOGIN_REQUEST on requestLogin()', () => {
      const expectedAction = {
        type: 'LOGIN_REQUEST',
      };

      expect(action.requestLogin()).to.deep.equal(expectedAction);
    });

    it('should send action type LOGIN_SUCCESS on receiveLogin() and store user.site_token', () => {
      const fakeUser = {
        site_token: 'sdffifsidjfas201209someSiteTokenheri',
      };

      const expectedAction = {
        type: 'LOGIN_SUCCESS',
        siteToken: 'LoadEffect-sdffifsidjfas201209someSiteTokenheri',
      };

      expect(action.receiveLogin(fakeUser)).to.deep.equal(expectedAction);
    });

    it('should send action type LOGIN_FAILURE and send message on loginError()', () => {
      const fakeMessage = 'There was an error logging in';

      const expectedAction = {
        type: 'LOGIN_FAILURE',
        message: fakeMessage,
      };

      expect(action.loginError(fakeMessage)).to.deep.equal(expectedAction);
    });
  });
});
