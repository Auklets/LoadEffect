import React, { PropTypes } from 'react';
import { Col, Grid, Row, Image, Button } from 'react-bootstrap';

const GetStarted = (props) => {
  const { showLogin, showSignup, isAuthenticated } = props;

  return (
    <div className="container-fluid splash-get-started">
      <Grid className="text-center" fluid>
        <Row className="show-grid">
          <Col sm={12}>
            <h2>Innovative companies are using our service</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={6}>
            <Row>
              <Col sm={6}>
                <Image src="/assets/hr.png" />
              </Col>
              <Col sm={6}>
                <Image src="/assets/ms.png" />
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Image src="/assets/tg.png" />
              </Col>
              <Col sm={6}>
                <Image src="/assets/mm.png" />
              </Col>
            </Row>
          </Col>

          <Col sm={6}>
            <h3>Get Started</h3>
            <div>
              {!isAuthenticated ? (
                <p>
                  <Button onClick={showLogin} bsSize="large" bsStyle="info">
                    Login
                  </Button>
                  {' '}
                  <Button onClick={showSignup} bsSize="large" bsStyle="primary">
                    Signup
                  </Button>
                </p>
              ) : null}
            </div>
          </Col>

        </Row>
      </Grid>
    </div>
  );
}

GetStarted.propTypes = {
  showLogin: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  showSignup: PropTypes.func,
};

export default GetStarted;
