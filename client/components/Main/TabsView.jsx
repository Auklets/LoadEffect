import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ResultsContainer from '../Results/ResultsContainer.jsx';
import SummaryView from './SummaryView.jsx';

const TabsView = props => (
    <Tabs className="container" defaultActiveKey={1} id="uncontrolled-tab-example" position="left">
      <Tab eventKey={1} title="Summary"><SummaryView {...props} /> </Tab>
      <Tab eventKey={2} title="Results"><ResultsContainer /></Tab>
    </Tabs>
);

TabsView.propTypes = {

};

export default TabsView;
