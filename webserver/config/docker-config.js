const fs = require('fs');
const Docker = require('dockerode');

const dockerModemConfig = new Docker({ socketPath: '/var/run/docker.sock' });

const dockerConnection = new Docker({
  host: '45.55.183.145',
  port: 2376,
  ca: fs.readFileSync('./do1/ca.pem'),
  cert: fs.readFileSync('./do1/cert.pem'),
  key: fs.readFileSync('./do1/key.pem'),
});

module.exports = dockerConnection;
