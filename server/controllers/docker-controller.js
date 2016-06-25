
const fs = require('fs');
const Docker = require('dockerode');

const dockerConfig = new Docker({socketPath: '/var/run/docker.sock'});
const dockerConnection = new Docker({
  host: '45.55.183.145',
  port: 2376,
  ca: fs.readFileSync('../certificates/do1/ca.pem'),
  cert: fs.readFileSync('../certificates/do1/cert.pem'),
  key: fs.readFileSync('../certificates/do1/key.pem'),
});

const status = {
  workerCount: 0
};

const createWorker = (req, res) => {
  status.workerCount++;
  const workerName = 'worker'.concat(status.workerCount);
  dockerConnection.createContainer({ Image: 'node-sender', name: workerName }, (err, container) => {
    container.start((startErr, data) => {
      if (err) {
        console.log('error while starting new container', startErr);
        res.status(500).send('error while starting new container', err);
      } else {
        console.log('container started with the following id: ', container.id);
        res.status(201).send('container successfully created and running');
      }
    });
  });
};

const checkWorker = (req, res) => {
  console.log('checkContainer called');
  // implement docker container check

  res.status(200).send('container checked');
};

module.exports = { createWorker, checkWorker };
