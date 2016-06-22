import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Results from '../../../client/components/Results/Results.jsx';
import ResultsContainer from '../../../client/components/Results/ResultsContainer.jsx';

const setup = () => {
  const props = {
    data: {
      testName: 'Test 1000',
      numOfSlaves: 1000,
    },
  };
  return shallow(<Results {...props} />);
};

xdescribe('<Results />', () => {
  xit('Should pass', () => {
    expect(true).to.equal(true);
  });

  xit('It should render', () => {
    const wrapper = setup(<Results />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('Load Testing Info');
  });
});
