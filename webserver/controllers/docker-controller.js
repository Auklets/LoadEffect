const request = require('request');
const dockerConnection = require('../config/docker-config');
const util = require('../lib/utils');

// URL Configuration for Master Server
const masterProtocol = 'http://';
const masterHost = process.env.MASTERHOST_PORT_1000_TCP_ADDR;
const masterPort = 2000;
const masterRoute = '/api/master';

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

const spoolUpMaster = data => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    // create Master to execute new scenario
    createMaster(
      (masterName) => {
        console.log('Master Name ==>', masterName);
        // send data to master
        setTimeout(() => {
          getMasterIP(masterName, (masterIP) => {
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

module.exports = { spoolUpMaster, createMaster, getMasterIP };
