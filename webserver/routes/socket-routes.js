const getResultsDataHandler = require('../controllers/results-controller');

const socketRoutes = (socket) => {
  console.log('a user connected');
  socket.on('getResultsData', getResultsDataHandler);
  socket.on('disconnect', () => console.log('user disconnected'));
};

module.exports = socketRoutes;
