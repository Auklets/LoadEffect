import React, { PropTypes } from 'react';
import { Button, Table, Jumbotron, Well, DropdownButton, MenuItem } from 'react-bootstrap';

const Main = props => {
  const { allScenarios, showResultsPage, validateUrl, runVerifiedScenario, rerunScenarioTest } = props;
  const handleViewResults = item => () => showResultsPage(item.id);
  const handleValidation = (url, id) => () => validateUrl(url, id);
  const handleRunTest = creds => () => runVerifiedScenario(creds);
  const handleRerunTest = creds => () => rerunScenarioTest(creds);

  const showButtonStatus = item => {
    if (item.isVerifiedOwner) {
      return !item.completion ? (
        <DropdownButton bsSize="xsmall" bsStyle="success" title="Verified">
          <MenuItem onClick={handleRunTest(item)} eventKey="1">
            Run Test
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
        </DropdownButton>
      );
    }

    return (
      <Button onClick={handleValidation(item.targetURL, item.id)} bsSize="xsmall" bsStyle="danger">
        Validate Site
      </Button>
   );
  };

  const tableInstance = (
    <Table responsive striped hover bordered>
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
          item.completion = 1;
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
    <div className="container-fluid">
      <Jumbotron>
        <h1>Summary</h1>
        <p>
          This is going to be the main page, the protected route that the user should
          be able to get to after successfully logging in.
          See below for summary of scenarios that have been ran in the past.
        </p>
        <hr />
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
