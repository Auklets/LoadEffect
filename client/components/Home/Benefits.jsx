import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const Benefits = () => (
  <div id="services-id" className="container-fluid splash-benefits">
    <Grid className="text-center" fluid>
      <Row className="show-grid">
        <Col sm={12}>
          <h1>Why use Load Effect?</h1>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col sm={4}>
          <i className="fa fa-line-chart" aria-hidden="true" />
          <h2>Real Time Reporting</h2>
          <p>Analyze response times and celebrating the taking down of your website as tests are running. You can even see view the results during the assault.</p>
        </Col>
        <Col sm={4}>
          <i className="fa fa fa-users" aria-hidden="true" />
          <h2>Scalable</h2>
          <p>Super free, super efficient. Plan a DDOS attack on your favorite website and see how well it holds up.</p>
        </Col>
        <Col sm={4}>
          <i className="fa fa-file-code-o" aria-hidden="true" />
          <h2>Customizable Scripts</h2>
          <p>Bring down your website with a script that you can write yourself using our world-class scripting language written by Bill Ramsey. It can do while loops.</p>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Benefits;
