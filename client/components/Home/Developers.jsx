import React from 'react';
import { Col, Grid, Row, Image } from 'react-bootstrap';

const developers = [
  {
    image: '/assets/B.gif',
    name: 'Bill "The Wardlord" Ramsey',
    github: 'billramsey',
    linkedIn: 'bill-ramsey-9554536a',
    twitter: 'bill-ramsey-hr',
  },
  {
    image: '/assets/F.gif',
    name: 'Felix "Bitcoin Master" Feng',
    github: 'felix2feng',
    linkedIn: 'felix-feng-86558627',
    twitter: 'felix2feng',
  },
  {
    image: '/assets/C.gif',
    name: 'Chris "Chrizzzer" Haug',
    github: 'cshg',
    linkedIn: 'christianshaug',
    twitter: 'christianshaug',
  },
  {
    image: '/assets/A.gif',
    name: 'Tai "The Machine" Huynh',
    github: 'anhtaiH',
    linkedIn: 'taihuynh',
    twitter: 'Anhtaihuman',
  },
];

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
        {developers.map(auklet => (
          <Col sm={3}>
            <Image src={auklet.image} />
            <h4>{auklet.name}</h4>
            <ul className="list-inline">
              <li><a target="_blank" href={`"https://github.com/${auklet.github}"`}><i className="fa fa-github" aria-hidden="true" /></a></li>
              <li><a target="_blank" href={`"https://linkedin.com/in/${auklet.linkedIn}"`}><i className="fa fa-linkedin-square" aria-hidden="true" /></a></li>
              <li><a target="_blank" href={`"https://twitter.com/${auklet.twitter}`}><i className="fa fa-twitter" aria-hidden="true" /></a></li>
            </ul>
          </Col>
          )
        )}
      </Row>
    </Grid>
  </div>
);

export default Developers;
