import React, { PropTypes } from 'react';
import { Button, Table, Jumbotron, Well } from 'react-bootstrap';

const Main = (props) => {
  const { allScenarios, showResultsPage, validateUrl, runVerifiedScenario } = props;
  const handleViewResultsClick = item => () => showResultsPage(item.id);
  const handleValidationClick = (url, id) => () => validateUrl(url, id);
  const handleRunTestClick = creds => () => runVerifiedScenario(creds);

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
          const buttonStyle = item.completion ? 'success' : 'warning';
          const buttonText = item.completion ? 'View Results' : 'Run Test';
          const buttonClickHandler = item.completion ? handleViewResultsClick : handleRunTestClick;

          const status = item.isVerifiedOwner ?
            <Button onClick={buttonClickHandler(item)} bsSize="xsmall" bsStyle={buttonStyle}>{buttonText}</Button> :
            <Button onClick={handleValidationClick(item.targetURL, item.id)} bsSize="xsmall" bsStyle="danger">Validate Site</Button>;

          return (
            <tr key={item.id}>
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{item.scenarioName}</td>
              <td className="text-center">{item.spawnsCount}</td>
              <td className="text-center">{item.workers}</td>
              <td className="text-center">{item.averageActionTime}</td>
              <td className="text-center">{item.targetURL}</td>
              <td className="text-center">{status}</td>
              <td className="text-center"><Button onClick={handleRunTestClick(item)} bsStyle="primary" bsSize="xsmall">Danger Danger</Button></td>
            </tr>
            );
        })}
      </tbody>
    </Table>
  );

  return (
    <div className="container">
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
  runVerifiedScenario: PropTypes.func,
  showResultsPage: PropTypes.func,
};

export default Main;
