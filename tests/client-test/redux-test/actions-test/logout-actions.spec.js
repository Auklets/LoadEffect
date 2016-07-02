/*  eslint-env mocha */
import { expect } from 'chai';
import * as action from '../../../../client/redux/actionCreators/logout-actions';

describe('Redux Logout Actions', () => {
  describe('Logout Authentication Actions', () => {
    it('should send action type LOGOUT_REQUEST on requestLogout()', () => {
      const expectedAction = {
        type: 'LOGOUT_REQUEST',
      };

      expect(action.requestLogout()).to.deep.equal(expectedAction);
    });

    it('should send action type LOGOUT_SUCCESS on receiveLogout()', () => {
      const expectedAction = {
        type: 'LOGOUT_SUCCESS',
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
