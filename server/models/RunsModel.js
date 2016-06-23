const db = require('../config/db');
const Scenario = require('./ScenariosModel');

db.knex.schema.hasTable('runs').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('runs', run => {
      run.increments('id').primary();
      run.integer('totalResponseTime', 255);
      run.integer('totalActionTime', 255);
      run.integer('id_scenario', 255);
      run.timestamps();
    }).then(table => {
      console.log('Runs table has been created.', table);
    });
  }
});

const Run = db.Model.extend({
  tableName: 'runs',
  hasTimeStamps: true,

  scenario() {
    this.belongsTo(Scenario, 'id_scenario');
  },
});

module.exports = Run;
