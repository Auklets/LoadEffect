/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { SignupContainer } from '../../../client/components/Signup/SignupContainer.jsx';
import SignupModal from '../../../client/components/Signup/SignupModal.jsx';

describe('Signup Components', () => {
  describe('<SignupModal />', () => {
    it('should render Signup Form', () => {
      const wrapper = shallow(<SignupModal />);
      expect(wrapper.find('Modal')).to.have.length(1);
    });
  });

  describe('<SignupContainer />', () => {
    it('should render Signup Modal Component', () => {
      const wrapper = shallow(<SignupContainer />);
      expect(wrapper.find('SignupModal')).to.have.length(1);
    });
  });
});

