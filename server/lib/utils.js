const sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const createContainer = (dockerConnection, imageName, containerName, req, res) => {
  dockerConnection.createContainer(
    { Image: imageName, name: containerName },
    (connectErr, container) => {
      if (connectErr) {
        console.log('error while creating new container', connectErr);
        res.status(500).send('error while creating new container', connectErr);
      } else {
        container.start((startErr) => {
          if (startErr) {
            console.log('error while starting new container', startErr);
            res.status(500).send('error while starting new container', startErr);
          } else {
            let successMessage = containerName.concat(' started with container id: ').concat(container.id);
            console.log(successMessage);
            res.status(201).send(successMessage);
          }
        });
      }
    }
  );
};

module.exports = { sendJSON, createContainer };
