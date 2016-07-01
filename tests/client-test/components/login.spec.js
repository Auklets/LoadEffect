/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { LoginContainer } from '../../../client/components/Login/LoginContainer.jsx';
import LoginModal from '../../../client/components/Login/LoginModal.jsx';

describe('Login Components', () => {
  describe('<LoginModal />', () => {
    it('should render Login Modal Form', () => {
      const wrapper = shallow(<LoginModal />);
      expect(wrapper.find('Modal')).to.have.length(1);
    });
  });

  describe('<LoginContainer />', () => {
    it('should render Login Container Component', () => {
      const wrapper = shallow(<LoginContainer />);
      expect(wrapper.find('LoginModal')).to.have.length(1);
    });
  });
});
