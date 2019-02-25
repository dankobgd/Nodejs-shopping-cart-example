const path = require('path');
const router = require('express').Router();
const mw = require('../middleware/middleware');
const c = require('../utils/loadControllers')(path.join(__dirname, '..', 'app'));

module.exports = function apiRoutes() {
  // Shop
  router.get('/', c.shop.get);

  // User
  router.get('/signup', mw.csrf(), mw.catchErrors(c.user.getSignup));
  router.get('/signin', mw.noLogin, mw.catchErrors(c.user.getSignin));
  router.get('/profile', mw.requireLogin, mw.catchErrors(c.user.getProfile));
  router.get('/logout', mw.noLogin, mw.catchErrors(c.user.logout));

  router.post('/signup', mw.csrf(), mw.catchErrors(c.user.postSignup));
  router.post('/signin', mw.catchErrors(c.user.postSignin));

  return router;
};
