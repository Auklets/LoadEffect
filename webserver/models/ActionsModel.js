const db = require('../config/db');
const Scenario = require('./ScenariosModel');

db.knex.schema.hasTable('actions').then(exists => {
  if (!exists) {
    db.knex.schema.createTable('actions', action => {
      action.increments('id').primary();
      action.string('actionName', 255).unique();
      action.integer('statusCode', 255);
      action.integer('elapseTime', 255);
      action.integer('id_scenario', 255);
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
