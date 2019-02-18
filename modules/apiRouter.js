const shopRoutes = require('./shop/shopRoutes');

module.exports = app => {
  app.use('/', shopRoutes);
};
