const fs = require('fs');
const Docker = require('dockerode');

const dockerModemConfig = new Docker({ socketPath: '/var/run/docker.sock' });

const dockerConnection = new Docker({
  host: process.env.DOCKER_HOST,
  port: process.env.DOCKER_PORT,
  ca: fs.readFileSync('../env/certs/ca.pem'),
  cert: fs.readFileSync('../env/certs/cert.pem'),
  key: fs.readFileSync('../env/certs/key.pem'),
});

module.exports = dockerConnection;
