const config = require('../knexfile.js')
const knex = require('knex')

const knex_client = knex(config)

//knex.migrate.latest([config]) faz as migrations automaticamente

module.exports = knex_client