/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import SummaryView from '../../../client/components/Main/SummaryView.jsx';
import { MainContainer } from '../../../client/components/Main/MainContainer.jsx';

const setup = () => {
  const props = {
    allScenarios: [],
  };
  return shallow(<SummaryView {...props} />);
};

describe('Main Components', () => {
  describe('<MainModal />', () => {
    it('should render Summary Form', () => {
      const wrapper = setup();
      expect(wrapper.find('Table')).to.have.length(1);
    });
  });

  describe('<MainContainer />', () => {
    it('should render Main Container Component', () => {
      const wrapper = shallow(<MainContainer />);
      expect(wrapper.find('TabsView')).to.have.length(1);
    });
  });
});
