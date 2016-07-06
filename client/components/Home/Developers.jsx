import React from 'react';
import { Col, Grid, Row, Image } from 'react-bootstrap';

const Developers = () => (
  <div className="container-fluid splash-developers">
    <Grid className="text-center" fluid>
      <Row className="show-grid">
        <Col sm={12}>
          <h2>Meet the Team</h2>
        </Col>
      </Row>
      <br />
      <Row>
        <Col sm={3}>
          <Image src="/assets/B.gif" />
          <h4>Bill "The Warlord" Ramsey</h4>
          <ul className="list-inline">
            <li><a target="_blank" href="https://github.com/billramsey"><i className="fa fa-github" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://linkedin.com/in/bill-ramsey-9554536a"><i className="fa fa-linkedin-square" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="google.com"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
          </ul>
        </Col>
        <Col sm={3}>
          <Image src="/assets/F.gif" />
          <h4>Felix "Bitcoin Master" Feng</h4>
          <ul className="list-inline">
            <li><a target="_blank" href="https://github.com/felix2feng"><i className="fa fa-github" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://linkedin.com/in/felix-feng-86558627"><i className="fa fa-linkedin-square" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://twitter.com/felix2feng"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
          </ul>
        </Col>
        <Col sm={3}>
          <Image src="/assets/C.gif" />
          <h4>Chris "Chrizzzer" Haug</h4>
          <ul className="list-inline">
            <li><a target="_blank" href="https://github.com/cshg"><i className="fa fa-github" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://linkedin.com/in/christianshaug"><i className="fa fa-linkedin-square" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://twitter.com/christianshaug"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
          </ul>
        </Col>
        <Col sm={3}>
          <Image src="/assets/A.gif" />
          <h4>Tai "The Machine" Huynh</h4>
          <ul className="list-inline">
            <li><a target="_blank" href="https://github.com/anhtaiH"><i className="fa fa-github" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://linkedin.com/in/taihuynh"><i className="fa fa-linkedin-square" aria-hidden="true" /></a></li>
            <li><a target="_blank" href="https://twitter.com/Anhtaihuman"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
          </ul>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Developers;
