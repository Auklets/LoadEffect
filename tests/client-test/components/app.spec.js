import { expect } from 'chai';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import AppContainer from '../../../client/components/AppContainer.jsx';

xdescribe('<AppContainer />', () => {
  xit('Should pass', () => {
    expect(true).to.equal(true);
  });

  xit('It should render', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Load Testing Info');
  });
});
