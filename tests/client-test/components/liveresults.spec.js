/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Results from '../../../client/components/Results/Results.jsx';
import { ResultsContainer } from '../../../client/components/Results/ResultsContainer.jsx';

describe('Results Components', () => {
  xdescribe('<Results />', () => {
    it('should render Results Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find('ChartistGraph')).to.have.length(1);
    });
  });

  describe('<ResultsContainer />', () => {
    it('should render Results Container Component', () => {
      const wrapper = shallow(<ResultsContainer />);
      expect(wrapper.find('Results')).to.have.length(1);
    });
  });
});
