import React, { PropTypes } from 'react';
import { Table, Jumbotron } from 'react-bootstrap';

const Main = (props) => {
  const tableInstance = (
    <Table responsive striped hover bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Scenario Name</th>
          <th>Spawn Count</th>
          <th># of Workers</th>
          <th>Average Response Time</th>
          <th>Average Action Time</th>
          <th>Target URL</th>
        </tr>
      </thead>
      <tbody>
        {props.allScenarios.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.scenarioName}</td>
              <td>{item.spawnsCount}</td>
              <td>{item.workers}</td>
              <td>{item.averageResponseTime}</td>
              <td>{item.averageActionTime}</td>
              <td>{item.targetURL}</td>
            </tr>
            );
        })}
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
      {tableInstance}
    </Jumbotron>
  );
};

Main.propTypes = {
  allScenarios: PropTypes.array,
};

export default Main;
