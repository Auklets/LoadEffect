/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Results from '../../../client/components/Results/Results.jsx';
import { ResultsContainer } from '../../../client/components/Results/ResultsContainer.jsx';

describe('Results Components', () => {
  const props = {
    scenario: {
      allScenarios: [],
      currentScenarioID: 0,
      currentSpawnsCount: 0,
      currentWorkers: 0,
      currentTargetURL: '',
      currentScenarioName: '',
      isValidScript: false,
      attemptedCheck: false,
      completion: false,
      isVerifiedOwner: false,
    },
    updateLineChartData() {},
    updateData() {},
    charts: {
      spawnLabel: [1, 2, 3, 4, 5, 6, 7, 8],
      elapsedTimeSpawn: [1, 9, 7, 8, 5, 3, 5, 4],
      index: [1, 2, 3, 4, 5, 6, 7, 8],
      httpVerb: ['GET', 'POST', 'GET', 'POST', 'GET', 'POST', 'GET', 'POST'],
      actionTaken: ['action1', 'action2', 'action3', 'action2', 'action2', 'action3', 'action4', 'action2'],
      path: ['pathA', 'pathB', 'pathA', 'pathB', 'pathC', 'pathA', 'pathB', 'pathC'],
      statusCode: [200, 300, 400, 200, 200, 200, 400, 200],
      elapsedTimeAction: [2, 3, 4, 5, 3, 3, 2, 1],
      averageElapsedTime: 0,
      numberErrors: 0,
      numberActions: 0,
      currentSpawns: 0,
      percentComplete: 0,
    },
  };

  describe('<Results {...props} />', () => {
    it('should render Test Summary Component', () => {
      const wrapper = shallow(<Results {...props} />);
'      expect(wrapper.find(TestSummary)).to.have.length(1);
    '    });

    it('should render General Statistics Component', () => {
      const wrapper = shallow(<Results {...props} />);
      expect(wrapper.find('GeneralStatistics')).to.have.length(1);
    });

    it('should render Actions Table Component', () => {
      const wrapper = shallow(<Results {...props} />);
      expect(wrapper.find('ActionsTable')).to.have.length(1);
    });

    it('should render Line Graph Component', () => {
      const wrapper = shallow(<Results {...props} />);
      expect(wrapper.find('LineGraph')).to.have.length(1);
    });

    it('should render Progress Bar Component', () => {
      const wrapper = shallow(<Results {...props} />);
      expect(wrapper.find('ProgressBar')).to.have.length(1);
    });
  });

  describe('<ResultsContainer />', () => {
    it('should render Results Container Component', () => {
      const wrapper = shallow(<ResultsContainer />);
      expect(wrapper.find('Results')).to.have.length(1);
    });
  });
});

describe('Create Bar Chart Data', () => {
  it('should calculate the average of the numbers', () => {
    const testData1 = ['a', 'a', 'a'];
    const testData2 = [1, 2, 3];

    const result = createBarChartData(testData1, testData2);
    // expect(result.series[0][0]).to.equal(2);
  });

  it('should return the correct number of unique x axis items', () => {

  });

  it('should return the correct number of unique x axis items and averages', () => {

  });
});
