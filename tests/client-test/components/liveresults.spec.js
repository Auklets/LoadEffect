/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import LiveResults from '../../../client/components/LiveResults/LiveResults.jsx';
import { LiveResultsContainer } from '../../../client/components/LiveResults/LiveResultsContainer.jsx';

describe('Live Results Components', () => {
  xdescribe('<LiveResults />', () => {
    it('should render Live Results Component', () => {
      const wrapper = shallow(<LiveResults />);
      expect(wrapper.find('ChartistGraph')).to.have.length(1);
    });
  });

  describe('<LiveResultsContainer />', () => {
    it('should render Live Results Container Component', () => {
      const wrapper = shallow(<LiveResultsContainer />);
      expect(wrapper.find('LiveResults')).to.have.length(1);
    });
  });
});
