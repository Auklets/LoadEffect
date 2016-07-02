const db = require('../config/db');
const Scenario = require('./ScenariosModel');

db.knex.schema.hasTable('actions').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('actions', action => {
      action.increments('id').primary();
      action.string('actionTaken', 255);
      action.string('Path', 255);
      action.integer('statusCode', 255);
      action.integer('elapsedTime', 255);
      action.integer('id_scenario', 255);
      action.string('httpVerb', 255);
      action.timestamps();
    }).then(table => {
      console.log('Actions table has been created.', table);
    });
  }
});

const Action = db.Model.extend({
  tableName: 'actions',
  hasTimeStamps: true,

  scenario() {
    this.belongsTo(Scenario, 'id_scenario');
  },
});

module.exports = Action;
