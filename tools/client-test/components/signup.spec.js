import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import SignupContainer from '../../../client/components/Signup/SignupContainer.jsx';

const setup = () => {
  const props = {
    data: {
      testName: 'Test 1000',
      numOfSlaves: 1000,
    },
  };
  return shallow(<SignupContainer {...props} />);
};

describe('<SignupContainer />', () => {
  xit('Should pass', () => {
    expect(true).to.equal(true);
  });

  xit('It should render', () => {
    const wrapper = setup(<SignupContainer />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Load Testing Info');
  });
});
