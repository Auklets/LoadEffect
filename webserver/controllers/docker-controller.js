const dockerConnection = require('../config/docker-config');
const util = require('../lib/utils');

const status = {
  masterCount: 0,
};

const createMaster = (callback) => {
  status.masterCount++;
  const masterName = 'master'.concat(status.masterCount);
  const imageName = 'cshg/loadmaster:' + process.env.NODE_ENV;
  util.createContainer(dockerConnection, imageName, masterName);
  callback(masterName);
};

const getMasterIP = (masterName, callback) => {
  util.checkContainer(dockerConnection, masterName, (data) => {
    callback(data.NetworkSettings.IPAddress);
  });
};

module.exports = { createMaster, getMasterIP };
