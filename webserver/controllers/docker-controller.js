// if (process.env.NODE_ENV !== 'integration') {
  console.log('create dockerConnection');
  const dockerConnection = require('../config/docker-config');
// }

const util = require('../lib/utils');

const status = {
  masterCount: 0,
};

const createMaster = () => {
  status.masterCount++;
  const masterName = 'master'.concat(status.masterCount);
  const imageName = 'cshg/loadmaster';
  util.createContainer(dockerConnection, imageName, masterName);
  return masterName;
};

const getMasterIP = (masterName, callback) => {
  const containerName = masterName;
  util.checkContainer(dockerConnection, containerName, function(data) {
    callback(data.NetworkSettings.IPAddress);
  });
};

module.exports = { createMaster, getMasterIP };
