
const fs = require('fs');
const Docker = require('dockerode');

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

const createContainer = (imageName, containerName) => {
  dockerConnection.createContainer(
    { Image: imageName, name: containerName },
    (connectErr, container) => {
      if (connectErr) {
        console.log('error while creating new container', connectErr);
        res.status(500).send('error while creating new container', err);
      } else {
        container.start((startErr) => {
          if (startErr) {
            console.log('error while starting new container', startErr);
            res.status(500).send('error while starting new container', err);
          } else {
            console.log(containerName, 'started with the following container id: ', container.id);
            res.status(201).send('container successfully created and running');
          }
        });
      }
    }
  );
};

const createMaster = (req, res) => {
  status.masterCount++;
  const masterName = 'master'.concat(status.masterCount);
  createContainer('node-sender', masterName);
};

const createWorker = (req, res) => {
  status.workerCount++;
  const workerName = 'worker'.concat(status.workerCount);
  createContainer('node-sender', workerName);
};

const checkWorker = (req, res) => {
  console.log('checkContainer called');
  // implement docker container check

  res.status(200).send('container checked');
};

module.exports = { createMaster, createWorker, checkWorker };
