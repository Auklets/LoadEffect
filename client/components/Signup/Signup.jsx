import React from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button,
Grid, Row, Col } from 'react-bootstrap';

const Signup = () => (
  <Form>
    <Grid>
      <Row className="show-grid">
        <Col sm={6}>
          <FormGroup controlId="formInlineFirstName">
            <ControlLabel>First Name:</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Enter first name" />
          </FormGroup>
        </Col>

        <Col sm={6}>
          <FormGroup controlId="formInlineLastName">
            <ControlLabel>Last Name:</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Enter last name" />
          </FormGroup>
        </Col>

        <Col sm={12}>
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email:</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="Enter a valid email address" />
          </FormGroup>
        </Col>

        <Button bStyle="primary" type="submit">
          Send invitation
        </Button>
      </Row>
    </Grid>
  </Form>

);

export default Signup;
