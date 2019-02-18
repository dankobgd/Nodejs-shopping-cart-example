const router = require('express').Router();

/* GET shop index page */
router.get('/', (req, res, next) => {
  res.render('shop/index', {title: 'Shop Index'});
});

module.exports = router;
