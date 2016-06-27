const db = require('../config/db');
const User = require('./UsersModel');
const Spawn = require('./SpawnsModel');
const Action = require('./ActionsModel');

db.knex.schema.hasTable('scenarios').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('scenarios', scenario => {
      scenario.increments('id').primary();
      scenario.string('scenarioName', 255);
      scenario.integer('spawnsCount');
      scenario.integer('workers');
      scenario.integer('averageResponseTime');
      scenario.integer('averageActionTime');
      scenario.string('targetURL', 255);
      scenario.text('script');
      scenario.integer('id_user');
      scenario.timestamps();
    }).then(table => {
      console.log('Scenarios table has been created.', table);
    });
  }
});

const Scenario = db.Model.extend({
  tableName: 'scenarios',
  hasTimeStamps: true,
  user() {
    return this.belongsTo(User, 'id_user');
  },

  spawn() {
    return this.hasMany(Spawn);
  },

  actions() {
    return this.hasMany(Action);
  },
});

module.exports = Scenario;
