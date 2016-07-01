/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../../../client/components/AppContainer.jsx';

describe('App Components', () => {
  describe('<AppContainer />', () => {
    it('should render main App', () => {
      const wrapper = shallow(<AppContainer />);
      expect(wrapper.find('main')).to.have.length(1);
    });
  });
});
