import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export const Demo1 = () => (
  <div id="demo1-id" className="container-fluid splash-demo1">
    <Grid className="text-center" fluid>
      <Row className="demo-custom-script">
        <Col className="text-custom" sm={6}>
          <p className="lead">
            Load Effect supports script validation, so you can comfortably write knowing that the test will according to spec
          </p>
        </Col>

        <Col className="test-img" sm={6}>
          <Image responsive src="/assets/images/2.gif" />
        </Col>

      </Row>
    </Grid>
  </div>
);

export const Demo2 = () => (
  <div id="demo2-id" className="container-fluid splash-demo2">
    <Grid className="text-center" fluid>
      <Row>
        <Col sm={12}>
          <h1>Load test only your own web app</h1>
          <p className="lead">Use the built-in validation tool to verify domain ownership.</p>
        </Col>
      </Row>
      <Row>
        <Col className="test-img" sm={12}>
          <Image responsive src="/assets/images/1.gif" />
        </Col>
      </Row>
    </Grid>
  </div>
);
