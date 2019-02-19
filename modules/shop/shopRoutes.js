const router = require('express').Router();
const knex = require('../../db/connection');

/* GET shop index page */
router.get('/', async (req, res, next) => {
  try {
    const a = await knex('products');
    console.log(a);
  } catch (err) {
    console.log(err);
  }
  res.render('shop/index', {title: 'Shop Index'});
});

module.exports = router;
