exports.up = knex =>
  knex.schema.createTable('cartList', t => {
    t.increments('id').primary();
    t.integer('orderId')
      .references('id')
      .inTable('orders')
      .notNullable();
    t.integer('productId')
      .references('id')
      .inTable('products')
      .notNullable();
    t.integer('quantity').notNullable();
  });

exports.down = knex => knex.schema.dropTable('cartList');
