const knex = require('../../db/connection');

module.exports = {
  getProductById(id) {
    return knex('products').where('id', id);
  },
  getProducts() {
    return knex('products');
  },
};
