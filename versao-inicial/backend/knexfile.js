module.exports = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user:     'postgres',
    password: '3003'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
  }
};
