const path = require('path');
const router = require('express').Router();
const mw = require('../middleware/middleware');
const c = require('../utils/loadControllers')(path.join(__dirname, '..', 'app'));

module.exports = function apiRoutes() {
  // ## Shop
  router.get('/', mw.catchErrors(c.shop.get));
  router.get('/shopping-cart', mw.requireLogin, mw.catchErrors(c.shop.getShoppingCart));
  router.get('/add-to-cart/:productId', mw.catchErrors(c.shop.getAddToCart));

  // ## User
  router.get('/signup', mw.redirectAuthed, mw.csrf(), mw.catchErrors(c.user.getSignup));
  router.post('/signup', mw.csrf(), mw.catchErrors(c.user.postSignup));
  router.get('/signin', mw.redirectAuthed, mw.catchErrors(c.user.getSignin));
  router.post('/signin', mw.catchErrors(c.user.postSignin));
  router.get('/profile', mw.requireLogin, mw.catchErrors(c.user.getProfile));
  router.get('/logout', mw.catchErrors(c.user.logout));

  return router;
};
