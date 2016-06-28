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
  util.createContainer(dockerConnection, 'master', masterName);
};

module.exports = { createMaster };
