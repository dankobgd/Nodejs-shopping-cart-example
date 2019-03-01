const knex = require('../../db/connection');

module.exports = {
  getProductById(id) {
    return knex('products').where('id', id);
  },
  getProducts() {
    return knex('products');
  },
  addOrder(order) {
    return knex('orders').insert(order);
  },
  addOrderedCartItems(items) {
    return knex('cartList').insert(items);
  },
};
