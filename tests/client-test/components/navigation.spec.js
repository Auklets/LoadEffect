/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../../../client/components/Navigation/Navigation.jsx';
import { NavigationContainer } from '../../../client/components/Navigation/NavigationContainer.jsx';

describe('Navigation Components', () => {
  describe('<Navigation />', () => {
    it('should render Navigation Component', () => {
      const wrapper = shallow(<Navigation />);
      expect(wrapper.find('Nav')).to.have.length(1);
    });
  });

  describe('<NavigationContainer />', () => {
    it('should render Navigation Container Component', () => {
      const wrapper = shallow(<NavigationContainer />);
      expect(wrapper.find('Navigation')).to.have.length(1);
    });
  });
});
