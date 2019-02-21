const path = require('path');
const router = require('express').Router();
const loadControllers = require('../utils/loadControllers');

const appDir = path.join(__dirname, '..', 'app');
const c = loadControllers(appDir);

module.exports = function apiRoutes() {
  router.get('/', c.shop.get);
  router.get('/signup', c.user.getSignup);

  return router;
};
