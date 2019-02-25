exports.up = knex =>
  knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.datetime('resetPasswordToken');
    t.datetime('resetPasswordExpires');
  });

exports.down = knex => knex.schema.dropTable('users');
