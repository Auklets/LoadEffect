const request = require('request');

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

const sendDataToMaster = data => {
  const masterUrl = `http://${process.env.MASTER_HOST}:${process.env.MASTER_PORT}/api/master`;
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
};

module.exports = { sendJSON, createContainer, checkContainer, sendDataToMaster };
