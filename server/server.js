const express = require('express');
const app = express();
const http = require('http').Server(app);

app.set('port', process.env.port || 8000);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app);

http.listen(app.get('port'), () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
