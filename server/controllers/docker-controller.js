
const fs = require('fs');
const Docker = require('dockerode');
const util = require('../lib/utils');

const dockerConfig = new Docker({ socketPath: '/var/run/docker.sock' });
const dockerConnection = new Docker({
  host: '45.55.183.145',
  port: 2376,
  ca: fs.readFileSync('../certificates/do1/ca.pem'),
  cert: fs.readFileSync('../certificates/do1/cert.pem'),
  key: fs.readFileSync('../certificates/do1/key.pem'),
});

const status = {
  masterCount: 0,
  workerCount: 0,
};

const createMaster = (req, res) => {
  status.masterCount++;
  const masterName = 'master'.concat(status.masterCount);
  util.createContainer(dockerConnection, 'node-sender', masterName, req, res);
};

const createWorker = (req, res) => {
  status.workerCount++;
  const workerName = 'worker'.concat(status.workerCount);
  util.createContainer(dockerConnection, 'node-sender', workerName, req, res);
};

const checkWorker = (req, res) => {
  console.log('checkContainer called');
  // implement docker container check

  res.status(200).send('container checked');
};

module.exports = { createMaster, createWorker, checkWorker };
