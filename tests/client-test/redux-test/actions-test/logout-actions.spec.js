/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/logout-actions';

describe('Redux Logout Actions', () => {
  describe('Logout Authentication Actions', () => {
    it('should set state isFetching and isAuthenticate to true on requestLogout()', () => {
      const expectedAction = {
        type: action.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
      };

      expect(action.requestLogout()).to.deep.equal(expectedAction);
    });

    it('should set state isFetching and isAuthenticated to false on receiveLogout()', () => {
      const expectedAction = {
        type: action.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
      };

      expect(action.receiveLogout()).to.deep.equal(expectedAction);
    });

    it('should log user out and remove token from localStorage', () => {
      localStorage.setItem('id_token', 'fake token');
      expect(localStorage.getItem('id_token')).to.equal('fake token');
      action.logoutUser()(func => func);
      expect(localStorage.getItem('id_token')).to.be.null;
    });
  });
});
