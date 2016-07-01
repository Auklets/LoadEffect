/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { HomeContainer } from '../../../client/components/Home/HomeContainer.jsx';
import Home from '../../../client/components/Home/Home.jsx';

describe('Home Components', () => {
  describe('<Home />', () => {
    it('should render Home Component', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('Jumbotron')).to.have.length(1);
      expect(wrapper.find('h1').text()).to.equal('LoadEffect');
    });
  });

  describe('<HomeContainer />', () => {
    it('should render Home Container Component', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('Home')).to.have.length(1);
    });
  });
});
