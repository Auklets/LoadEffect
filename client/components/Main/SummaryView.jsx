import React, { PropTypes } from 'react';
import { Button, Table, Jumbotron, Well } from 'react-bootstrap';
import VerifySiteContainer from '../VerifySite/VerifySiteContainer.jsx';

const SummaryView = (props) => {
  const { showVerifyModal, allScenarios } = props;

  const tableInstance = (
    <Table responsive striped hover bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Scenario Name</th>
          <th>Spawn Count</th>
          <th># of Workers</th>
          <th>Average Elapsed Time</th>
          <th>Target URL</th>
          <th>Website Validation</th>
        </tr>
      </thead>
      <tbody>
        {allScenarios.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.scenarioName}</td>
              <td>{item.spawnsCount}</td>
              <td>{item.workers}</td>
              <td>{item.averageActionTime}</td>
              <td>{item.targetURL}</td>
              <td>
                {!!item.isVerifiedOwner ?
                  (<span style={{ color: 'green' }}>Verified</span>) :
                  (<span style={{ color: 'red' }}>Unverified</span>)
                }
              </td>
            </tr>
            );
        })}
        <VerifySiteContainer allScenarios={allScenarios} />
      </tbody>
    </Table>
  );

  return (
    <Jumbotron>
      <h1>Summary</h1>
      <p>
        This is going to be the main page, the protected route that the user should
        be able to get to after successfully logging in.
        See below for summary of scenarios that have been ran in the past.

      </p>
      <Button onClick={showVerifyModal} bsSize="xlarge" bsStyle="danger">Show Website Token</Button>
      <hr />
      <Well>
        {tableInstance}
      </Well>
    </Jumbotron>
  );
};

SummaryView.propTypes = {
  allScenarios: PropTypes.array,
  showVerifyModal: PropTypes.func,
};

export default SummaryView;
