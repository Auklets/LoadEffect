/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Results from '../../../client/components/Results/Results.jsx';
import { ResultsContainer } from '../../../client/components/Results/ResultsContainer.jsx';

import TestSummary from '../../../client/components/Results/ChartComponents/TestSummary.jsx';
import GeneralStatistics from '../../../client/components/Results/ChartComponents/GeneralStatistics.jsx';
import ActionsTable from '../../../client/components/Results/ChartComponents/ActionsTable.jsx';
import LineGraph from '../../../client/components/Results/ChartComponents/LineGraph.jsx';
import { ProgressBar } from 'react-bootstrap';


describe('Results Components', () => {
  describe('<Results />', () => {
    it('should render Test Summary Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find(TestSummary)).to.have.length(1);
    });

    it('should render General Statistics Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find(GeneralStatistics)).to.have.length(1);
    });

    it('should render Actions Table Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find(ActionsTable)).to.have.length(1);
    });

    it('should render Line Graph Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find(LineGraph)).to.have.length(1);
    });

    it('should render Progress Bar Component', () => {
      const wrapper = shallow(<Results />);
      expect(wrapper.find(ProgressBar)).to.have.length(1);
    });
  });

  describe('<ResultsContainer />', () => {
    it('should render Results Container Component', () => {
      const wrapper = shallow(<ResultsContainer />);
      expect(wrapper.find('Results')).to.have.length(1);
    });
  });
});
