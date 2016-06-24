
const fs = require('fs');
const Docker = require('dockerode');

const docker = new Docker({socketPath: '/var/run/docker.sock'});
const docker1 = new Docker({
  host: '45.55.183.145',
  port: 2376,
  ca: fs.readFileSync('../certificates/do1/ca.pem'),
  cert: fs.readFileSync('../certificates/do1/cert.pem'),
  key: fs.readFileSync('../certificates/do1/key.pem')
});

const createContainer = (req, res) => {
  console.log('createContainer called');
  // implement docker instance creation

  res.status(201).send('container successfully created and running');
};

const checkContainer = (req, res) => {
  console.log('checkContainer called');
  // implement docker container check

  res.status(200).send('container checked');
};

module.exports = { createContainer, checkContainer };
