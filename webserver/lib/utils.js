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
  container.inspect(function (err, data) {
    callback(data);
  });
};


module.exports = { sendJSON, createContainer, checkContainer };
