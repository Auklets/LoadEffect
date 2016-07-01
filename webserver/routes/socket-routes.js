const resultsHandler = '../controllers/results-controller';

module.exports = (socket) => {
  console.log('a user connected');

  socket.on('getResultsData', resultsHandler);
  socket.on('disconnect', () => console.log('user disconnected'));
};

