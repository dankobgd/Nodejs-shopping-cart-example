exports.up = knex =>
  knex.schema.createTable('products', t => {
    t.increments('id').primary();
    t.string('title').notNullable();
    t.string('description').notNullable();
    t.integer('price').notNullable();
    t.string('thumbnail').notNullable();
    t.datetime('created_at').defaultTo(knex.fn.now());
    t.datetime('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('products');
