import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';

const ActionsTable = (props) => (
  <Panel bsStyle="primary">
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Index</th>
          <th>Type</th>
          <th>Status Code</th>
          <th>Elapsed Time</th>
        </tr>
      </thead>
      <tbody>
        {props.index.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item}</td>
              <td>{props.httpVerb[i]}</td>
              <td>{props.statusCode[i]}</td>
              <td>{props.elapsedTimeAction[i]}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </Panel>
);

ActionsTable.propTypes = {
  index: PropTypes.array.isRequired,
  httpVerb: PropTypes.array.isRequired,
  statusCode: PropTypes.array.isRequired,
  elapsedTimeAction: PropTypes.array.isRequired,
};

export default ActionsTable;
