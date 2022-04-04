const {PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD} = require('./variableConfig')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

/*                      old line for SQLite3
const sharedConfig = {
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
} ...sharedCongfig
*/


module.exports = {

  

  development: {
    client: 'pg',
    migrations: { directory: __dirname + '/data/migrations' },
    connection: {
      host:     PG_HOST,
      port:     PG_PORT,
      database: PG_DATABASE,
      user:     PG_USER,
      password: PG_PASSWORD
    },

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

  }

};
