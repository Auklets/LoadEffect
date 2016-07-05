const request = require('request');
const dockerController = require('../controllers/docker-controller');

// URL Configuration for Master Server
const masterProtocol = 'http://';
const masterHost = process.env.MASTERHOST_PORT_1000_TCP_ADDR;
const masterPort = 2000;
const masterRoute = '/api/master';

const sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const createContainer = (dockerConnection, imageName, containerName) => {
  dockerConnection.createContainer(
    {
      Image: imageName,
      name: containerName,
      HostConfig: {
        Binds: ["/env:/env"],
        Links: ["mysql:mysql", "web:web"],
        PortBindings: { "2000": [{ "HostPort": "20" }] },
      },
    },
    (connectErr, container) => {
      if (connectErr) {
        console.log('error while creating new container', connectErr);
        return 'error while creating new container'.concat(connectErr);
      } else {
        container.start((startErr) => {
          if (startErr) {
            console.log('error while starting new container', startErr);
            return 'error while starting new container'.concat(startErr);
          } else {
            let successMessage = containerName.concat(' started with container id: ').concat(container.id);
            console.log(successMessage);
            return successMessage;
          }
        });
      }
    }
  );
};

const checkContainer = (dockerConnection, containerName, callback) => {
  var container = dockerConnection.getContainer(containerName);
  container.inspect((err, data) => {
    if (err) {
      console.error('error while fetching IP from container', err);
    } else {
      callback(data);
    }
  });
};

const spoolUpMaster = data => {
  console.log('this should be called', data);
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    // create Master to execute new scenario
    dockerController.createMaster(
      (masterName) => {
        console.log('Master Name ==>', masterName);
        // send data to master
        setTimeout(() => {
          dockerController.getMasterIP(masterName, (masterIP) => {
            console.log('Master IP received ==>', masterIP);
            const masterUrl = `${masterProtocol}${masterIP}:${masterPort}${masterRoute}`;
            console.log('Sending data to ==>', masterUrl);
            data.masterName = masterName;
            request.post({
              url: masterUrl,
              json: true,
              body: data,
            },
            (err, response, body) => {
              if (err) {
                console.log('Error while sending data to master ==>', err);
              } else {
                console.log('Successfully sent data to master! Response body ==>', body);
              }
            });
          });
        }, 7000);
      });
  }
};

module.exports = { sendJSON, createContainer, checkContainer, spoolUpMaster };
