module.exports = {
  createContainer: (req, res) => {
    console.log('createContainer');

    res.status(201).send('container successfully created and running');
  },

  checkContainer: (req, res) => {
    console.log('checkContainer');

    res.status(200).send('container checked');
  },
};
