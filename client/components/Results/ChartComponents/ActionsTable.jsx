import React, { PropTypes } from 'react';
import { Panel, Table } from 'react-bootstrap';

const ActionsTable = (props) => (
  <Panel collapsible bsStyle="primary" header={'Actions Summary [Click to Expand / Collapse]'}>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Index</th>
          <th>Type</th>
          <th>Action Taken</th>
          <th>Path</th>
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
              <td>{props.actionTaken[i]}</td>
              <td>{props.path[i]}</td>
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
  actionTaken: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  statusCode: PropTypes.array.isRequired,
  elapsedTimeAction: PropTypes.array.isRequired,
};

export default ActionsTable;
