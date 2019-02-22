const path = require('path');
const router = require('express').Router();
const loadControllers = require('../utils/loadControllers');

const appDir = path.join(__dirname, '..', 'app');
const c = loadControllers(appDir);

module.exports = function apiRoutes() {
  // Shop
  router.get('/', c.shop.get);

  // User
  router.get('/signup', c.user.getSignup);
  router.get('/signin', c.user.getSignin);

  return router;
};
