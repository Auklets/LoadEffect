const db = require('../config/db');
const Scenario = require('./ScenariosModel');

db.knex.schema.hasTable('spawns').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('spawns', spawn => {
      spawn.increments('id').primary();
      spawn.integer('totalTime', 255);
      spawn.integer('id_scenario', 255);
    }).then(table => {
      console.log('Spawns table has been created.', table);
    });
  }
});

const Spawn = db.Model.extend({
  tableName: 'spawns',
  hasTimeStamps: true,

  scenario() {
    this.belongsTo(Scenario, 'id_scenario');
  },
});

module.exports = Spawn;
