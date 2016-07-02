const express = require('express');
const app = express();
const http = require('http').Server(app);
const passport = require('passport');

const environment = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: '../env/production.env' });
}

app.set('secret', process.env.DB_SECRET);
app.set('port', process.env.WEB_PORT || 8000);

require('./config/middleware.js')(app, express);
require('./routes/auth-routes.js')(app);
require('./routes/api-routes.js')(app);
require('./config/passport.js')(app, passport);

const io = require('socket.io')(http);

const socketRoutes = require('./routes/socket-routes.js');
io.on('connection', socketRoutes);

http.listen(process.env.WEB_PORT, () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

exports.app = app;
exports.io = io;
