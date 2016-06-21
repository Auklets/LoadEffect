import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../../client/components/Main/Main.jsx';
import MainContainer from '../../../client/components/Main/MainContainer.jsx';

const setup = () => {
  const props = {
    data: {
      testName: 'Test 1000',
      numOfSlaves: 1000,
    },
  };
  return shallow(<Main {...props} />);
};

describe('<Main />', () => {
  xit('Should pass', () => {
    expect(true).to.equal(true);
  });

  xit('It should render', () => {
    const wrapper = setup(<Main />);
    expect(wrapper.find('Jumbotron')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('MAIN PAGE');
  });
});
