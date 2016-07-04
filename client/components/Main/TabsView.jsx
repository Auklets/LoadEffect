import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ResultsContainer from '../Results/ResultsContainer.jsx';

const TabsView = props => (
  <Tabs className="container" defaultActiveKey={1} id="uncontrolled-tab-example">
    <Tab eventKey={1} title="Summary">ok </Tab>
    <Tab eventKey={2} title="Live Results">ok</Tab>
    <Tab eventKey={3} title="Results"><ResultsContainer /></Tab>
  </Tabs>
);

TabsView.propTypes = {

};

export default TabsView;
