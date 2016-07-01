/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Main from '../../../client/components/Main/Main.jsx';
import { MainContainer } from '../../../client/components/Main/MainContainer.jsx';

const setup = () => {
  const props = {
    allScenarios: [],
  };
  return shallow(<Main {...props} />);
};

describe('Main Components', () => {
  describe('<MainModal />', () => {
    it('should render Main Form', () => {
      const wrapper = setup();
      expect(wrapper.find('Table')).to.have.length(1);
    });
  });

  describe('<MainContainer />', () => {
    it('should render Main Container Component', () => {
      const wrapper = shallow(<MainContainer />);
      expect(wrapper.find('Main')).to.have.length(1);
    });
  });
});
