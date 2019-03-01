exports.up = knex =>
  knex.schema.createTable('orders', t => {
    t.increments('id').primary();
    t.integer('userId')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    t.integer('chargeAmount').notNullable();
    t.string('chargeToken').notNullable();
    t.string('receiptUrl').notNullable();
    t.string('stripeToken').notNullable();
    t.string('stripeTokenType').notNullable();
    t.string('stripeEmail').notNullable();
    t.string('stripeBillingName').notNullable();
    t.string('stripeBillingAddressCountry').notNullable();
    t.string('stripeBillingAddressCountryCode').notNullable();
    t.integer('stripeBillingAddressZip').notNullable();
    t.string('stripeBillingAddressLine1').notNullable();
    t.string('stripeBillingAddressCity').notNullable();
    t.string('stripeShippingName').notNullable();
    t.string('stripeShippingAddressCountry').notNullable();
    t.string('stripeShippingAddressCountryCode').notNullable();
    t.integer('stripeShippingAddressZip').notNullable();
    t.string('stripeShippingAddressLine1').notNullable();
    t.string('stripeShippingAddressCity').notNullable();
    t.datetime('created_at').defaultTo(knex.fn.now());
    t.datetime('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('orders');
