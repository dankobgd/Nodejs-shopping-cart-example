require('dotenv').config();

const ENV = process.env.NODE_ENV || 'development';

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

const developmentConfig = {
  session: {
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    secure: ENV === 'production',
    maxAge: 3600000, // 1 hour
    expires: new Date(Date.now() + 3600000),
  },
  stripe: {
    secret: process.env.STRIPE_SECRET_KEY
  },
  email: {},
};

const productionConfig = {
  session: {
    secret: process.env.SESSION_SECRET,
  },
  stripe: {
    secret: process.env.STRIPE_SECRET_KEY
  },
  email: {},
};

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
