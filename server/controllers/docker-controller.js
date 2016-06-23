
const createContainer = (req, res) => {
  console.log('createContainer');
  // implement docker instance creation

  res.status(201).send('container successfully created and running');
};

const checkContainer = (req, res) => {
  console.log('checkContainer');
  // implement docker container check

  res.status(200).send('container checked');
};

module.exports = { createContainer, checkContainer };
