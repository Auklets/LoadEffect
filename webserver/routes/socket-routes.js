const getResultsDataHandler = require('../controllers/results-controller');

const socketRoutes = (socket) => {
  console.log('a user connected', socket.decoded_token.name);
  console.log(socket.decoded_token.name);
  socket.on('getResultsData', getResultsDataHandler);
  socket.on('disconnect', () => console.log('user disconnected'));
};

module.exports = socketRoutes;
