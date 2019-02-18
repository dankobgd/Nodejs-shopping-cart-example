require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

const developmentConfig = {
  db: {
    client: 'sqlite3',
    name: 'shop',
    filename: '../db/shop.db',
    migrationsTableName: 'knex_migrations',
    migrationsDirectory: '../db/migrations/',
    seedsDirectory: '../db/seeds/',
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  email: {},
};

const productionConfig = {};

function getEnvironmentConfig(env) {
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    default:
      return productionConfig;
  }
}

module.exports = {
  ...defaultConfig,
  ...getEnvironmentConfig(ENV),
};
