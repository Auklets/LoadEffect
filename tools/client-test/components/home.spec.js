import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../../client/components/Home/Home.jsx';
import HomeContainer from '../../../client/components/Home/HomeContainer.jsx';

const setup = () => {
  const props = {
    data: {
      testName: 'Test 1000',
      numOfSlaves: 1000,
    },
  };
  return shallow(<Home {...props} />);
};

describe('<Home />', () => {
  it('Should pass', () => {
    expect(true).to.equal(true);
  });

  it('It should render', () => {
    const wrapper = setup(<Home />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Load Testing Info');
  });
});
