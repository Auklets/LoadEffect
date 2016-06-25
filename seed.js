var User = require('./server/models/UsersModel');
var Scenario = require('./server/models/ScenariosModel');


var scenarioData = [
  {
    scenarioName: 'Test 1',
    spawnsCount: 1000,
    workers: 10,
    averageResponseTime: 2000,
    averageActionTime: 1000,
    targetURL: 'http://www.facebook.com',
    script: 'visit origin page',
    id_user: 1,
  },
  {
    scenarioName: 'Test 2',
    workers: 30,
    averageResponseTime: 2500,
    averageActionTime: 1400,
    targetURL: 'http://www.google.com',
    script: 'try to log in',
    id_user: 1,
  },
  {
    scenarioName: 'Test 3',
    spawnsCount: 10000,
    workers: 50,
    averageResponseTime: 2300,
    averageActionTime: 3000,
    targetURL: 'http://www.hackreactor.com',
    script: 'click on a few links',
    id_user: 1,
  },
  {
    scenarioName: 'Test 4',
    spawnsCount: 7500,
    workers: 50,
    averageResponseTime: 2500,
    averageActionTime: 1700,
    targetURL: 'http://www.airbnb.com',
    script: 'load a picture from airbnb',
    id_user: 1,
  },
  {
    scenarioName: 'Test 5',
    spawnsCount: 100000,
    workers: 100,
    averageResponseTime: 3000,
    averageActionTime: 600,
    targetURL: 'http://www.reddit.com',
    script: 'post a new thread',
    id_user: 1,
  },
  {
    scenarioName: 'Test 6',
    spawnsCount: 120000,
    workers: 120,
    averageResponseTime: 2531,
    averageActionTime: 999,
    targetURL: 'http://www.craigslist.com',
    script: 'send a message to the poster',
    id_user: 1,
  },
];

var user = new User({
  email: 'Anhtaih89@gmail.com',
  name: 'Tai Huynh',
});
user.setPassword('secret password');
user.save();

for (var i = 0; i < scenarioData.length; i++) {
  new Scenario(scenarioData[i]).save();
}
