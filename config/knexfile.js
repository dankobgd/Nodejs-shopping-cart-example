const config = require('./index');

module.exports = {
  development: {
    client: config.db.client,
    connection: {
      filename: config.db.filename,
    },
    migrations: {
      tableName: config.db.migrationsTableName,
      directory: config.db.migrationsDirectory,
      seeds: config.db.seedsDirectory,
    },
  },

  production: {
    client: config.db.client,
    connection: {
      database: config.db.dbName,
      user: config.db.user,
      password: config.db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: config.db.migrationsName,
    },
  },
};
