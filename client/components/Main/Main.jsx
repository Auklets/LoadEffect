import React, { PropTypes } from 'react';
import { Button, Table, Jumbotron, Well, DropdownButton, MenuItem } from 'react-bootstrap';

const Main = props => {
  const { allScenarios, showResultsPage, validateUrl, runVerifiedScenario, rerunScenarioTest, removeScenario } = props;
  const handleViewResults = item => () => showResultsPage(item.id);
  const handleValidation = (url, id) => () => validateUrl(url, id);
  const handleRunTest = creds => () => runVerifiedScenario(creds);
  const handleRerunTest = creds => () => rerunScenarioTest(creds);
  const handleDeleteTest = id => () => removeScenario(id);

  const showButtonStatus = item => {
    if (item.isVerifiedOwner) {
      return !item.completion ? (
        <DropdownButton bsSize="xsmall" bsStyle="success" title="Verified">
          <MenuItem onClick={handleRunTest(item)} eventKey="1">
            Run Test
          </MenuItem>
          <MenuItem onClick={handleDeleteTest(item.id)} eventKey="2">
            Delete Test
          </MenuItem>
        </DropdownButton>
      ) : (
        <DropdownButton bsSize="xsmall" bsStyle="success" title="Verified">
          <MenuItem onClick={handleViewResults(item)} eventKey="1">
            View Results
          </MenuItem>
          <MenuItem onClick={handleRerunTest(item)} eventKey="2">
            Run Test Again
          </MenuItem>
          <MenuItem onClick={handleDeleteTest(item.id)} eventKey="2">
            Delete Test
          </MenuItem>
        </DropdownButton>
      );
    }

    return (
      <DropdownButton bsSize="xsmall" bsStyle="danger" title="Unverified">
        <MenuItem onClick={handleValidation(item.targetURL, item.id)} eventKey="1">
          Validate Site
        </MenuItem>
        <MenuItem onClick={handleDeleteTest(item.id)} eventKey="1">
          Delete Test
        </MenuItem>
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
          <th className="text-center">Run Test Anyway</th>
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
            <td className="text-center">{item.averageActionTime}</td>
            <td className="text-center">{item.targetURL}</td>
            <td className="text-center">{showButtonStatus(item)}</td>
            <td className="text-center"><Button onClick={handleRunTest(item)} bsStyle="primary" bsSize="xsmall">Danger Danger</Button></td>
          </tr>
          )}
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="container-fluid summary-view">
      <Jumbotron className="jumbo-table">
        <Well>
          {tableInstance}
        </Well>
      </Jumbotron>
    </div>
  );
};

Main.propTypes = {
  allScenarios: PropTypes.array,
  validateUrl: PropTypes.func,
  rerunScenarioTest: PropTypes.func,
  runVerifiedScenario: PropTypes.func,
  showResultsPage: PropTypes.func,
};

export default Main;
