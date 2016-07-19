import React, { PropTypes } from 'react';
import { Table, Well, DropdownButton, MenuItem, PageHeader } from 'react-bootstrap';

const Main = props => {
  const { allScenarios, showResultsPage, validateUrl, runVerifiedScenario, rerunScenarioTest, removeScenario, showDemoModal } = props;
  const handleViewResults = item => () => showResultsPage(item.id);
  const handleValidation = (url, id) => () => validateUrl(url, id);
  const handleRunTest = creds => () => runVerifiedScenario(creds);
  const handleRerunTest = creds => () => rerunScenarioTest(creds);
  const handleDeleteTest = id => () => removeScenario(id);

  if (!allScenarios.length) {
    const sampleData = {
      scenarioName: 'Fake Test',
      spawnsCount: 1000,
      workers: 5,
      targetURL: 'anhtaihuynh.com',
      id: 5,
      averageElapsedTime: 783,
      isVerifiedOwner: 1,
      completion: 0,
    };

    const sampleData2 = {
      scenarioName: 'Another Fake Test',
      spawnsCount: 800,
      workers: 10,
      targetURL: 'christianhaug.com',
      id: 3,
      averageElapsedTime: 685,
      isVerifiedOwner: 0,
      completion: 1,
    };

    const sampleData3 = {
      scenarioName: 'Real Test',
      spawnsCount: 7600,
      workers: 20,
      targetURL: 'felixfeng.com',
      id: 2,
      averageElapsedTime: 977,
      isVerifiedOwner: 1,
      completion: 1,
    };

    allScenarios.push(sampleData, sampleData2, sampleData3);
  }

  const showButtonStatus = item => {
    const deleteTestButton = (
      <MenuItem onClick={handleDeleteTest(item.id)} eventKey="2">
        Delete Test
      </MenuItem>
    );

    if (item.isVerifiedOwner) {
      return !item.completion ? (
        <DropdownButton bsSize="xsmall" bsStyle="success" title="Verified">
          <MenuItem onClick={showDemoModal} eventKey="1">
            Run Test
          </MenuItem>
          {deleteTestButton}
        </DropdownButton>
      ) : (
        <DropdownButton bsSize="xsmall" bsStyle="success" title="Verified">
          <MenuItem onClick={handleViewResults(item)} eventKey="1">
            View Results
          </MenuItem>
          <MenuItem onClick={showDemoModal} eventKey="2">
            Run Test Again
          </MenuItem>
          {deleteTestButton}
        </DropdownButton>
      );
    }

    return (
      <DropdownButton bsSize="xsmall" bsStyle="danger" title="Unverified">
        <MenuItem onClick={handleValidation(item.targetURL, item.id)} eventKey="1">
          Validate Your Site
        </MenuItem>
        {deleteTestButton}
      </DropdownButton>
   );
  };

  const tableInstance = (
    <Table striped hover bordered className="summary-table">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">Scenario Name</th>
          <th className="text-center">Spawn Count</th>
          <th className="text-center"># of Workers</th>
          <th className="text-center">Average Elapsed Time</th>
          <th className="text-center">Target URL</th>
          <th className="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {allScenarios.map((item, i) => {
          return (
            <tr key={item.id}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{item.scenarioName}</td>
              <td className="text-center">{item.spawnsCount}</td>
              <td className="text-center">{item.workers}</td>
              <td className="text-center">{item.averageElapsedTime ? item.averageElapsedTime : 'Not Available'}</td>
              <td className="text-center">{item.targetURL}</td>
              <td className="text-center">{showButtonStatus(item)}</td>
            </tr>
          )}
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="container-fluid summary-view">
      <PageHeader>Scenario Summary</PageHeader>
      <Well>
        {tableInstance}
      </Well>
    </div>
  );
};

Main.propTypes = {
  allScenarios: PropTypes.array,
  removeScenario: PropTypes.func,
  showDemoModal: PropTypes.func,
  validateUrl: PropTypes.func,
  rerunScenarioTest: PropTypes.func,
  runVerifiedScenario: PropTypes.func,
  showResultsPage: PropTypes.func,
};

export default Main;
