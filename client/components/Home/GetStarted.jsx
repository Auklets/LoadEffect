import React, { PropTypes } from 'react';
import { Col, Grid, Row, Image } from 'react-bootstrap';

const GetStarted = () => (
  <div id="get-started-id" className="container-fluid splash-get-started">
    <Grid className="text-center" fluid>
      <Row className="show-grid">
        <Col sm={12}>
          <h2>Innovative companies using Load Effect</h2>
        </Col>
      </Row>
      <br />
      <Row className="row-companies">
        <Col sm={12}>
          <Col sm={3}>
            <Image src="/assets/images/hr.png" />
          </Col>
          <Col sm={3}>
            <Image src="/assets/images/ms.png" />
          </Col>
          <Col sm={3}>
            <Image src="/assets/images/tg.png" />
          </Col>
          <Col sm={3}>
            <Image className="mm-img" src="/assets/images/mm.png" />
          </Col>
        </Col>
      </Row>
    </Grid>
  </div>
);


GetStarted.propTypes = {
  showLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  showSignup: PropTypes.func,
};

export default GetStarted;
