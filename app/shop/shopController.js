const knex = require('../../db/connection');

module.exports.get = async (req, res, next) => {
  const productsList = await knex('products');

  const productChunks = [];
  const chunkSize = 3;

  for (let i = 0; i < productsList.length; i += chunkSize) {
    productChunks.push(productsList.slice(i, i + chunkSize));
  }

  res.render('shop/index', {products: productChunks});
};
