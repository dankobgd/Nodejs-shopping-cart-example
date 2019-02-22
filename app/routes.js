const path = require('path');
const router = require('express').Router();
const mw = require('../middleware/middleware');
const c = require('../utils/loadControllers')(path.join(__dirname, '..', 'app'));

module.exports = function apiRoutes() {
  // Shop
  router.get('/', c.shop.get);

  // User
  router.get('/signup', mw.csrf(), mw.catchErrors(c.user.getSignup));
  router.get('/signin', mw.catchErrors(c.user.getSignin));

  return router;
};
