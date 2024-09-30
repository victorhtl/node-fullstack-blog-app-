require('dotenv').config()

module.exports = {
  client: process.env.PGCLIENT,
  connection: {
    host: 'localhost',
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user:     process.env.PGUSER,
    password: process.env.PGPASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
  }
};
