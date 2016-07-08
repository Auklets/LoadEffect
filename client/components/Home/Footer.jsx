import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const Footer = () => (
  <div className="container-fluid footer">
    <Grid className="text-center" fluid>
      <Row className="show-grid">
        <ul className="list-inline">
          <li><a target="_blank" href="https://github.com/Auklets/LoadEffect">Github</a></li>
          <li>|</li>
          <li><a target="_blank" href="https://twitter.com/felix2feng">Twitter</a></li>
          <li>|</li>
          <li><a target="_blank" href="http://bit.ly/29lcage">API Documentation</a></li>
        </ul>
        <Col sm={12}>
          <p className="hr-blurb">
            Made with <span className="glyphicon glyphicon-heart" aria-hidden="true" /> at <a target="_blank" href="http://www.hackreactor.com">Hack Reactor</a> in San Francisco, CA.
          </p>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Footer;
