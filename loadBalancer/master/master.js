// All master logic incl. Communication between web server and slave, slave spin up and wind down

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Modules
const masterHandler = require('./master_handler.js');

// DEPENDENCY: [TODO] Need to update with correct port number
const port = process.env.port || 8000;

// Start Express Server
const app = express();
app.set('port', port);

// Middleware
app.use(bodyParser.json());

// Handle POST request from the web server
app.post('/api/master', masterHandler.webServer);

// Handle heartbeat POST request from the slave
app.post('/api/heartbeat', masterHandler.heartbeat);

// Handle completion POST request from the slave
app.post('/api/complete', masterHandler.complete);

// Server listens at specified port
app.listen(app.get('port'), () => {
  console.log(`Master server listening to port ${app.get('port')}`);
});

