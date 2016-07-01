/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/login-actions';

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

  describe('Login Authentication Actions', () => {
    it('should set state isFetching to true and isAuthenticate to false on requestLogin()', () => {
      const fakeCreds = {
        email: 'tai@hackreactor.com',
        password: 'passsss',
      };

      const expectedAction = {
        type: action.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds: {
          email: 'tai@hackreactor.com',
          password: 'passsss',
        },
      };

      expect(action.requestLogin(fakeCreds)).to.deep.equal(expectedAction);
    });

    it('should set state isFetching to false and isAuthenticated to true on receiveLogin() and store user.id_token', () => {
      const fakeUser = {
        id_token: 'sdffifsidjfas20123#09someJWTTokenhere0239402934jfdi',
      };

      const expectedAction = {
        type: action.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: 'sdffifsidjfas20123#09someJWTTokenhere0239402934jfdi',
      };

      expect(action.receiveLogin(fakeUser)).to.deep.equal(expectedAction);
    });

    it('should set state isFetching and isAuthenticated to false on loginError()', () => {
      const fakeMessage = 'There was an error logging in';

      const expectedAction = {
        type: action.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: fakeMessage,
      };

      expect(action.loginError(fakeMessage)).to.deep.equal(expectedAction);
    });
  });

});
