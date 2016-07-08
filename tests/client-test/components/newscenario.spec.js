/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { NewScenarioContainer } from '../../../client/components/NewScenario/NewScenarioContainer.jsx';
import NewScenario from '../../../client/components/NewScenario/NewScenario.jsx';

describe('New Scenario Components', () => {
  describe('<NewScenario />', () => {
    it('should render New Scenario Component', () => {
      const wrapper = shallow(<NewScenario />);
      expect(wrapper.find('FormGroup')).to.have.length(5);
    });
  });

  describe('<NewScenarioContainer />', () => {
    it('should render New Scenario Container Component', () => {
      const wrapper = shallow(<NewScenarioContainer />);
      expect(wrapper.find('NewScenario')).to.have.length(1);
    });
  });
});
