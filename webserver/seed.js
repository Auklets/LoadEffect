/* eslint-disable */
require('dotenv').config({ path: './env/development.env' });
var User = require('./models/UsersModel');
var Scenario = require('./models/ScenariosModel');
var request = require('request');
var url = process.env.PROTOCOL + process.env.HOST + ':' + process.env.PORT + '/api/scenarios';

/*********** Setup & Randomizers ************/

var users = [];
var word1 = ['Login', 'Signup', 'Click', 'Link', 'Get', 'Post', 'Put', 'Delete', 'Head', 'Rats', 'Cats', 'Bats', 'Fats', 'Hats', 'Lats', 'Pats', 'Ats', 'Gats', 'Mats', 'Nats', 'Sats', 'Tats', 'Vats', 'Yats', 'Zats'];
var word2 = ['Wait', 'Go', 'Stop', 'Slow', 'Yield', 'Load', 'Pause', 'Look', 'See', 'Find', 'Search', 'Imagine', 'Wild', 'Contemplate', 'Stare', 'Stand', 'Walk', 'Fight', 'Fly', 'Drive', 'Write', 'Type', 'Analyze'];
var workers = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
var spawnsCounts = [5000, 10000, 15000, 100000, 2500, 3000, 3500, 4000, 4500, 7500, 400, 800, 2300, 1000, 500, 1800];
var responseTime = [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 3000, 5000, 4000];
var actionTime = [1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3400, 3900, 4100];
var urls = ['facebook', 'google', 'yahoo', 'airbnb', 'craiglist', 'lyft', 'uber', 'reddit', 'stackoverflow', 'github', 'slack', 'hackreactor', 'docker', 'anhtaihuynh', 'christianhaug', 'billramsey', 'felixfeng'];
var scripts = ['Spin around in circles and go crazy', 'Jump up and down excitedly as mommy pulls into the driveway, coming home from work',
  'Pace back and forth as you wait for the oven to finish cooking the lasagna', 'stare intently into the darkness that is under bed, hoping that no boogie man is waiting in silent',
  'drink 8 glasses of water within 10 minutes, wait another 20 minutes and then laugh as hard as you can at a joke you think is funny', 'spin around right round baby right round and then come back to earth',
  'find the fastest route possible and then go to the nearest restaurant to eat your favorite hopefully-not-rotten burger', 'go on the internet and browse the internet for comedic material that you can tell to your army veteran grandpa that never laughs',
  'watch game of thrones until you fall asleep forever', 'turn on the electric keyboard and press middle c to determine how well your voice is tuned to the instrument',
  'type really really really fast to see if you can beat the worlds fastest typer and then go home and have chicken', 'to infinite and beyond is the script that bill is writing but must finish this test first',
  'exercise all day long and do some body weight exercises to get back into shape and run a long marathon and beat everyone'];


/*********** Helper Functions ***********/

var createUser = function(name, email) {
  User.where('email', email)
    .fetch()
    .then(function(existingUser) {
      if (!existingUser) {
        var newUser = new User({ name: name, email: email });
        newUser.setPassword(name);
        newUser.save()
        .then(function() {
          users.push({
            id: newUser.get('id'),
            jwt: newUser.generateJwt()
          });
        });
      } else {
        users.push({
          id: existingUser.get('id'),
          jwt: existingUser.generateJwt()
        });
      }
    });
};

createUser('Tai Huynh', 'tai@seedreactor.com');
createUser('Bill Ramsey', 'bill@seedreactor.com');
createUser('Chris Haug', 'chris@seedreactor.com');
createUser('Felix Feng', 'felix@seedreactor.com');

var randomizer = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var createRandomScenario = function() {
  var randomUser = randomizer(users);

  var fakeScenarioData = {
    scenarioName: randomizer(word1) + ' ' + randomizer(word2) + ' Test',
    spawnsCount: randomizer(spawnsCounts),
    workers: randomizer(workers),
    targetURL: randomizer(urls),
    script: randomizer(scripts),
    id_user: randomUser.id,
  };

  request({
    method: 'POST',
    uri: url,
    json: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${randomUser.jwt}`,
    },
    body: fakeScenarioData
  });
}

console.log('Waiting five seconds before calling set interval...');

setTimeout(function() {
  var count = 0;
  setInterval(function() {
    count++;
    console.log('10 Seconds is up! Sending another post request for a new scenario... Total scenarios so far:', count);
    createRandomScenario()
  }, 10000)
}, 5000)

