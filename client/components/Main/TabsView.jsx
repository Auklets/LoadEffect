import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import LiveResultsContainer from '../LiveResults/LiveResultsContainer.jsx';
import SummaryView from './SummaryView.jsx';
import ResultDetailsContainer from '../ResultDetails/ResultDetailsContainer.jsx';

const TabsView = props => (
    <Tabs className="container" defaultActiveKey={1} id="uncontrolled-tab-example" position="left">
      <Tab eventKey={1} title="Summary"><SummaryView {...props} /> </Tab>
      <Tab eventKey={2} title="Live Results"><LiveResultsContainer /></Tab>
      <Tab eventKey={3} title="Results"><ResultDetailsContainer /></Tab>
    </Tabs>
);

TabsView.propTypes = {

};

export default TabsView;
