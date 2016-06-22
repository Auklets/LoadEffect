// All master logic incl. Communication between web server and slave, slave spin up and wind down

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

// Modules
const slaveHandler = require('./slave_handler.js');

// DEPENDENCY: Need to update with correct port number
const port = process.env.port || 8001;

// Start Express Server
const app = express();
app.set('port', port);

// Middleware
app.use(bodyParser.json());

// Respond to POST request from Master
// app.post('/api/slave', slaveHandler);

// Respond to cancellation POST request from Master
// app.post('/api/cancel', slaveHandler.cancel);

// Respond to wind down POST request from Master
// app.post('/api/shutDown', slaveHandler.shutDown);

// Server listens at specified port
app.listen(app.get('port'), () => {
  console.log(`Slave server listening to port ${app.get('port')}`);
  // On Fireup of server, read file and do a post request to the server.
  fs.readFile(`${process.cwd()}/testData/slaveContext.json`, 'utf-8', (err, data) => {
    const ipAddress = JSON.parse(data).getRequest;
    console.log('This is the IP Address I will post to', ipAddress);
    request.post(ipAddress, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      console.log('Received response from POST Request from Master Server');
      slaveHandler.handleJob(JSON.parse(body).job);
    });
  });
});
