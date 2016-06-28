// if (process.env.NODE_ENV !== 'integration') {
  console.log('create dockerConnection');
  const dockerConnection = require('../config/docker-config');
// }

const util = require('../lib/utils');

const status = {
  masterCount: 0,
};

const createMaster = (req, res) => {
  status.masterCount++;
  const masterName = 'master'.concat(status.masterCount);
  const imageName = 'cshg/loadmaster';
  util.createContainer(dockerConnection, imageName, masterName);
};

module.exports = { createMaster };
