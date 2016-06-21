// All master logic incl. Communication between web server and slave, slave spin up and wind down

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');

// Modules
const slaveHandler = require('./slave_handler.js');

// DEPENDENCY: Need to update with correct port number
const port = process.env.port || 8000;

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
  fs.readFile(`${process.cwd()}/testData/slaveContext.json`, 'utf-8', (err, data) => {
    const obj = JSON.parse(data);
    console.log(obj);
  });
  // Do a post request to the IP Address listed
});
