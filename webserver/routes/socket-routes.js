const resultsController = require('../controllers/results-controller');

const socketRoutes = (socket) => {
  console.log('a user connected', socket.decoded_token.name);
  socket.on('getResultsData', resultsController.getResultsDataHandler(socket));
  socket.on('saveComplete', resultsController.saveCompletedData);
  socket.on('disconnect', () => console.log('user disconnected'));
};

module.exports = socketRoutes;
