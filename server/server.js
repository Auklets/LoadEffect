const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const passport = require('passport');

const environment = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: './env/production.env' });
}

mongoose.connect(process.env.DATABASE);

app.set('secret', process.env.DB_SECRET);
app.set('port', process.env.port || 8000);

require('./config/middleware.js')(app, express);
require('./routes/api-routes.js')(app);
require('./routes/auth-routes.js')(app);
require('./config/passport.js')(app, passport);


http.listen(process.env.PORT, () => {
  console.log('Express server started in ' + app.get('env') + ' mode on port ' + app.get('port'));
});

module.exports = app;
