const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');

const config = require('../../webpack.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);

module.exports = (app, express) => {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'fred', resave: false, saveUninitialized: false }));
  app.use(express.static(path.join(`${__dirname}./../../dist`)));
};
