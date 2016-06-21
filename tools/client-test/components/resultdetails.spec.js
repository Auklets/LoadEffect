import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import ResultDetails from '../../../client/components/ResultDetails/ResultDetails.jsx';
import ResultDetailContainer from '../../../client/components/ResultDetails/ResultDetailsContainer.jsx';

const setup = () => {
  const props = {
    data: {
      testName: 'Test 1000',
      numOfSlaves: 1000,
    },
  };
  return shallow(<ResultDetails {...props} />);
};

describe('<ResultDetails />', () => {
  xit('Should pass', () => {
    expect(true).to.equal(true);
  });

  xit('It should render', () => {
    const wrapper = setup(<ResultDetails />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Load Testing Info');
  });
});
